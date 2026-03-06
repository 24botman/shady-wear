from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import os
import json
from datetime import datetime

# --- Supabase client ---
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://placeholder.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "placeholder-key")
SUPABASE_JWT_SECRET = os.environ.get("SUPABASE_JWT_SECRET", "placeholder-jwt-secret")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- JWT verification ---
from jose import jwt, JWTError

def verify_token(authorization: str = Header(None)):
    """Extract and verify the Supabase JWT from the Authorization header."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")


# --- Pydantic models ---
class OrderItem(BaseModel):
    product_id: str
    name: str
    size: str
    quantity: int
    price: float

class OrderCreate(BaseModel):
    items: List[OrderItem]
    total: float
    shipping_address: Optional[dict] = None

class ReviewCreate(BaseModel):
    rating: int
    comment: str

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str


# --- FastAPI app ---
app = FastAPI(
    title="Shady Wear API",
    description="Backend API for the Eminem Clothing Store",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ========================
# PRODUCTS
# ========================
@app.get("/api/products")
async def get_products():
    """Retrieve all products."""
    try:
        response = supabase.table("products").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    """Retrieve a single product by ID."""
    try:
        response = supabase.table("products").select("*").eq("id", product_id).single().execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=404, detail="Product not found")


# ========================
# ORDERS (Auth Required)
# ========================
@app.post("/api/orders")
async def create_order(order: OrderCreate, user=Depends(verify_token)):
    """Create a new order. Requires authentication."""
    user_id = user.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid user")

    try:
        order_data = {
            "user_id": user_id,
            "items": json.loads(json.dumps([item.dict() for item in order.items])),
            "total": order.total,
            "status": "pending",
            "shipping_address": order.shipping_address,
        }
        response = supabase.table("orders").insert(order_data).execute()
        return {"message": "Order placed successfully", "order": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/orders")
async def get_orders(user=Depends(verify_token)):
    """Get all orders for the authenticated user."""
    user_id = user.get("sub")
    try:
        response = (
            supabase.table("orders")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ========================
# REVIEWS
# ========================
@app.get("/api/reviews")
async def get_reviews():
    """Retrieve all reviews."""
    try:
        response = supabase.table("reviews").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/reviews")
async def create_review(review: ReviewCreate, user=Depends(verify_token)):
    """Submit a review. Requires authentication."""
    user_id = user.get("sub")
    user_name = user.get("user_metadata", {}).get("full_name", "Anonymous")

    if review.rating < 1 or review.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    try:
        review_data = {
            "user_id": user_id,
            "user_name": user_name,
            "rating": review.rating,
            "comment": review.comment,
        }
        response = supabase.table("reviews").insert(review_data).execute()
        return {"message": "Review posted successfully", "review": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ========================
# CONTACT
# ========================
@app.post("/api/contact")
async def submit_contact(contact: ContactCreate):
    """Submit a contact form message."""
    try:
        contact_data = {
            "name": contact.name,
            "email": contact.email,
            "message": contact.message,
        }
        response = supabase.table("contact_messages").insert(contact_data).execute()
        return {"message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ========================
# HEALTH CHECK
# ========================
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Shady Wear API", "version": "1.0.0"}
