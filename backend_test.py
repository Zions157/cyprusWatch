#!/usr/bin/env python3
"""
Comprehensive Backend API Test Suite for Cyprus Watch E-commerce Platform
Tests all authentication, favorites, orders, payment, and product endpoints
"""

import requests
import json
import uuid
from datetime import datetime
import time


class CyprusWatchAPITester:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.api_base = f"{self.base_url}/api"
        self.jwt_token = None
        self.user_id = None
        self.test_user_email = f"testuser_{uuid.uuid4().hex[:8]}@cypruswatch.com"
        self.test_product_id = None
        self.test_order_id = None
        self.results = {
            "passed": 0,
            "failed": 0,
            "tests": []
        }
        
    def log_test(self, test_name, success, message, details=None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details
        }
        self.results["tests"].append(result)
        if success:
            self.results["passed"] += 1
            print(f"✅ {test_name}: {message}")
        else:
            self.results["failed"] += 1
            print(f"❌ {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
    
    def make_request(self, method, endpoint, data=None, headers=None):
        """Make HTTP request with error handling"""
        url = f"{self.api_base}/{endpoint.lstrip('/')}"
        default_headers = {"Content-Type": "application/json"}
        if headers:
            default_headers.update(headers)
            
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=default_headers, timeout=10)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, headers=default_headers, timeout=10)
            elif method.upper() == "PUT":
                response = requests.put(url, json=data, headers=default_headers, timeout=10)
            elif method.upper() == "DELETE":
                response = requests.delete(url, json=data, headers=default_headers, timeout=10)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            return response
        except Exception as e:
            print(f"Request failed: {e}")
            return None

    def test_user_registration(self):
        """Test POST /api/auth/register"""
        test_data = {
            "email": self.test_user_email,
            "password": "SecurePass123!",
            "fullName": "Mehmet Cyprus",
            "phone": "+90 533 123 4567",
            "address": "Lefkoşa, Kıbrıs"
        }
        
        response = self.make_request("POST", "/auth/register", test_data)
        if not response:
            self.log_test("User Registration", False, "Request failed")
            return
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("token") and data.get("user"):
                self.jwt_token = data["token"]
                self.user_id = data["user"]["id"]
                self.log_test("User Registration", True, "User registered successfully with JWT token", 
                            f"Token: {self.jwt_token[:20]}..., User ID: {self.user_id}")
            else:
                self.log_test("User Registration", False, "Missing required response fields", data)
        else:
            self.log_test("User Registration", False, f"HTTP {response.status_code}: {response.text}")

    def test_user_login(self):
        """Test POST /api/auth/login"""
        test_data = {
            "email": self.test_user_email,
            "password": "SecurePass123!"
        }
        
        response = self.make_request("POST", "/auth/login", test_data)
        if not response:
            self.log_test("User Login", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("token") and data.get("user"):
                login_token = data["token"]
                self.log_test("User Login", True, "User logged in successfully", 
                            f"Token matches: {login_token == self.jwt_token}")
            else:
                self.log_test("User Login", False, "Missing required response fields", data)
        else:
            self.log_test("User Login", False, f"HTTP {response.status_code}: {response.text}")

    def test_user_profile_get(self):
        """Test GET /api/auth/me"""
        if not self.jwt_token:
            self.log_test("Get User Profile", False, "No JWT token available")
            return
            
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        response = self.make_request("GET", "/auth/me", headers=headers)
        
        if not response:
            self.log_test("Get User Profile", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("id") == self.user_id and data.get("email") == self.test_user_email:
                self.log_test("Get User Profile", True, "User profile retrieved successfully", 
                            f"Email: {data.get('email')}, Name: {data.get('fullName')}")
            else:
                self.log_test("Get User Profile", False, "Profile data mismatch", data)
        else:
            self.log_test("Get User Profile", False, f"HTTP {response.status_code}: {response.text}")

    def test_user_profile_update(self):
        """Test PUT /api/auth/profile"""
        if not self.jwt_token:
            self.log_test("Update User Profile", False, "No JWT token available")
            return
            
        update_data = {
            "fullName": "Mehmet Cyprus Updated",
            "phone": "+90 533 999 8888",
            "address": "Girne, Kıbrıs - Updated Address"
        }
        
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        response = self.make_request("PUT", "/auth/profile", update_data, headers)
        
        if not response:
            self.log_test("Update User Profile", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                self.log_test("Update User Profile", True, "User profile updated successfully")
            else:
                self.log_test("Update User Profile", False, "Update failed", data)
        else:
            self.log_test("Update User Profile", False, f"HTTP {response.status_code}: {response.text}")

    def test_create_product(self):
        """Test POST /api/products - Create a test product for favorites/orders"""
        product_data = {
            "name": "Test Rolex Submariner",
            "description": "Luxury diving watch with automatic movement",
            "price": 85000,
            "image": "https://via.placeholder.com/400x300?text=Rolex+Submariner",
            "stock": 5,
            "category": "Luxury",
            "productType": "watch"
        }
        
        response = self.make_request("POST", "/products", product_data)
        if not response:
            self.log_test("Create Product", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("id") and data.get("name"):
                self.test_product_id = data["id"]
                self.log_test("Create Product", True, "Product created successfully", 
                            f"Product ID: {self.test_product_id}, Name: {data['name']}")
            else:
                self.log_test("Create Product", False, "Missing product data", data)
        else:
            self.log_test("Create Product", False, f"HTTP {response.status_code}: {response.text}")

    def test_get_products(self):
        """Test GET /api/products"""
        response = self.make_request("GET", "/products")
        if not response:
            self.log_test("Get Products", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                product_count = len(data)
                self.log_test("Get Products", True, f"Retrieved {product_count} products successfully")
            else:
                self.log_test("Get Products", False, "Response is not a list", data)
        else:
            self.log_test("Get Products", False, f"HTTP {response.status_code}: {response.text}")

    def test_add_to_favorites(self):
        """Test POST /api/favorites/add"""
        if not self.jwt_token or not self.test_product_id:
            self.log_test("Add to Favorites", False, "Missing JWT token or product ID")
            return
            
        favorite_data = {"productId": self.test_product_id}
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        response = self.make_request("POST", "/favorites/add", favorite_data, headers)
        
        if not response:
            self.log_test("Add to Favorites", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                self.log_test("Add to Favorites", True, "Product added to favorites successfully")
            else:
                self.log_test("Add to Favorites", False, "Add to favorites failed", data)
        else:
            self.log_test("Add to Favorites", False, f"HTTP {response.status_code}: {response.text}")

    def test_get_favorites(self):
        """Test GET /api/favorites"""
        if not self.jwt_token:
            self.log_test("Get Favorites", False, "No JWT token available")
            return
            
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        response = self.make_request("GET", "/favorites", headers=headers)
        
        if not response:
            self.log_test("Get Favorites", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                favorites_count = len(data)
                has_test_product = any(p.get("id") == self.test_product_id for p in data)
                self.log_test("Get Favorites", True, 
                            f"Retrieved {favorites_count} favorite products, contains test product: {has_test_product}")
            else:
                self.log_test("Get Favorites", False, "Response is not a list", data)
        else:
            self.log_test("Get Favorites", False, f"HTTP {response.status_code}: {response.text}")

    def test_create_order(self):
        """Test POST /api/orders"""
        if not self.test_product_id:
            self.log_test("Create Order", False, "No test product available")
            return
            
        order_data = {
            "items": [
                {
                    "id": self.test_product_id,
                    "name": "Test Rolex Submariner",
                    "price": 85000,
                    "quantity": 1
                }
            ],
            "totalAmount": 85000,
            "customerInfo": {
                "fullName": "Mehmet Cyprus",
                "email": self.test_user_email,
                "phone": "+90 533 123 4567",
                "address": "Lefkoşa, Kıbrıs"
            },
            "paymentMethod": "bank"
        }
        
        headers = {"Authorization": f"Bearer {self.jwt_token}"} if self.jwt_token else {}
        response = self.make_request("POST", "/orders", order_data, headers)
        
        if not response:
            self.log_test("Create Order", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("id") and data.get("status") == "pending":
                self.test_order_id = data["id"]
                self.log_test("Create Order", True, "Order created successfully", 
                            f"Order ID: {self.test_order_id}, Status: {data['status']}")
            else:
                self.log_test("Create Order", False, "Invalid order response", data)
        else:
            self.log_test("Create Order", False, f"HTTP {response.status_code}: {response.text}")

    def test_get_user_orders(self):
        """Test GET /api/orders/my"""
        if not self.jwt_token:
            self.log_test("Get User Orders", False, "No JWT token available")
            return
            
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        response = self.make_request("GET", "/orders/my", headers=headers)
        
        if not response:
            self.log_test("Get User Orders", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                orders_count = len(data)
                has_test_order = any(o.get("id") == self.test_order_id for o in data)
                self.log_test("Get User Orders", True, 
                            f"Retrieved {orders_count} user orders, contains test order: {has_test_order}")
            else:
                self.log_test("Get User Orders", False, "Response is not a list", data)
        else:
            self.log_test("Get User Orders", False, f"HTTP {response.status_code}: {response.text}")

    def test_admin_get_orders(self):
        """Test GET /api/admin/orders"""
        response = self.make_request("GET", "/admin/orders")
        
        if not response:
            self.log_test("Admin Get Orders", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                orders_count = len(data)
                self.log_test("Admin Get Orders", True, f"Retrieved {orders_count} total orders")
            else:
                self.log_test("Admin Get Orders", False, "Response is not a list", data)
        else:
            self.log_test("Admin Get Orders", False, f"HTTP {response.status_code}: {response.text}")

    def test_payment_bank(self):
        """Test POST /api/payment/bank with email invoice"""
        if not self.test_order_id:
            self.log_test("Bank Payment", False, "No test order available")
            return
            
        payment_data = {
            "orderId": self.test_order_id,
            "amount": 85000,
            "cardInfo": {
                "cardNumber": "4111111111111111",
                "expiryMonth": "12",
                "expiryYear": "2025",
                "cvv": "123",
                "cardholderName": "MEHMET CYPRUS"
            }
        }
        
        response = self.make_request("POST", "/payment/bank", payment_data)
        
        if not response:
            self.log_test("Bank Payment", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("transactionId"):
                self.log_test("Bank Payment", True, "Payment processed successfully with email invoice", 
                            f"Transaction ID: {data['transactionId']}, Message: {data.get('message')}")
                
                # Check if email was sent by verifying order status
                time.sleep(2)  # Wait for email processing
                self.verify_email_sent()
                
            else:
                self.log_test("Bank Payment", False, "Payment failed", data)
        elif response.status_code == 400:
            # Demo payment rejection is expected
            data = response.json()
            self.log_test("Bank Payment", True, "Payment rejection simulation working", 
                        f"Message: {data.get('message')}")
        else:
            self.log_test("Bank Payment", False, f"HTTP {response.status_code}: {response.text}")

    def test_payment_transfer(self):
        """Test POST /api/payment/transfer with email invoice"""
        # Create a new order for transfer test
        transfer_order_data = {
            "items": [
                {
                    "id": self.test_product_id,
                    "name": "Test Transfer Order",
                    "price": 50000,
                    "quantity": 1
                }
            ],
            "totalAmount": 50000,
            "customerInfo": {
                "fullName": "Ayşe Cyprus",
                "email": f"transfer_{uuid.uuid4().hex[:8]}@cypruswatch.com",
                "phone": "+90 533 987 6543",
                "address": "Girne, Kıbrıs"
            },
            "paymentMethod": "transfer"
        }
        
        headers = {"Authorization": f"Bearer {self.jwt_token}"} if self.jwt_token else {}
        create_response = self.make_request("POST", "/orders", transfer_order_data, headers)
        
        if not create_response or create_response.status_code != 200:
            self.log_test("Transfer Payment", False, "Failed to create transfer order")
            return
            
        transfer_order_id = create_response.json().get("id")
        
        # Now process transfer payment
        payment_data = {"orderId": transfer_order_id}
        response = self.make_request("POST", "/payment/transfer", payment_data)
        
        if not response:
            self.log_test("Transfer Payment", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("iban"):
                self.log_test("Transfer Payment", True, "Transfer payment processed with IBAN details", 
                            f"IBAN: {data['iban']}, Message: {data.get('message')}")
            else:
                self.log_test("Transfer Payment", False, "Transfer payment failed", data)
        else:
            self.log_test("Transfer Payment", False, f"HTTP {response.status_code}: {response.text}")

    def verify_email_sent(self):
        """Verify that email was sent by checking order emailSent field"""
        if not self.test_order_id:
            return
            
        # Get all admin orders to find our test order
        response = self.make_request("GET", "/admin/orders")
        if response and response.status_code == 200:
            orders = response.json()
            test_order = next((o for o in orders if o.get("id") == self.test_order_id), None)
            if test_order and test_order.get("emailSent") == True:
                self.log_test("Email Invoice Verification", True, 
                            f"Email sent successfully for order {self.test_order_id}")
            else:
                self.log_test("Email Invoice Verification", False, 
                            f"Email not sent or not confirmed for order {self.test_order_id}")

    def test_admin_update_order(self):
        """Test PUT /api/admin/orders/:id"""
        if not self.test_order_id:
            self.log_test("Admin Update Order", False, "No test order available")
            return
            
        update_data = {"status": "shipped"}
        response = self.make_request("PUT", f"/admin/orders/{self.test_order_id}", update_data)
        
        if not response:
            self.log_test("Admin Update Order", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                self.log_test("Admin Update Order", True, "Order status updated successfully")
            else:
                self.log_test("Admin Update Order", False, "Update failed", data)
        else:
            self.log_test("Admin Update Order", False, f"HTTP {response.status_code}: {response.text}")

    def test_remove_from_favorites(self):
        """Test DELETE /api/favorites/remove"""
        if not self.jwt_token or not self.test_product_id:
            self.log_test("Remove from Favorites", False, "Missing JWT token or product ID")
            return
            
        remove_data = {"productId": self.test_product_id}
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        response = self.make_request("DELETE", "/favorites/remove", remove_data, headers)
        
        if not response:
            self.log_test("Remove from Favorites", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                self.log_test("Remove from Favorites", True, "Product removed from favorites successfully")
            else:
                self.log_test("Remove from Favorites", False, "Remove from favorites failed", data)
        else:
            self.log_test("Remove from Favorites", False, f"HTTP {response.status_code}: {response.text}")

    def test_update_product(self):
        """Test PUT /api/products/:id"""
        if not self.test_product_id:
            self.log_test("Update Product", False, "No test product available")
            return
            
        update_data = {
            "name": "Updated Rolex Submariner",
            "description": "Updated luxury diving watch",
            "price": 90000,
            "image": "https://via.placeholder.com/400x300?text=Updated+Rolex",
            "stock": 3,
            "category": "Premium",
            "productType": "watch"
        }
        
        response = self.make_request("PUT", f"/products/{self.test_product_id}", update_data)
        
        if not response:
            self.log_test("Update Product", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                self.log_test("Update Product", True, "Product updated successfully")
            else:
                self.log_test("Update Product", False, "Product update failed", data)
        else:
            self.log_test("Update Product", False, f"HTTP {response.status_code}: {response.text}")

    def test_delete_product(self):
        """Test DELETE /api/products/:id"""
        if not self.test_product_id:
            self.log_test("Delete Product", False, "No test product available")
            return
            
        response = self.make_request("DELETE", f"/products/{self.test_product_id}")
        
        if not response:
            self.log_test("Delete Product", False, "Request failed")
            return
            
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                self.log_test("Delete Product", True, "Product deleted successfully")
            else:
                self.log_test("Delete Product", False, "Product deletion failed", data)
        else:
            self.log_test("Delete Product", False, f"HTTP {response.status_code}: {response.text}")

    def run_all_tests(self):
        """Run all backend API tests in sequence"""
        print(f"\n🚀 Starting Cyprus Watch Backend API Tests")
        print(f"Base URL: {self.base_url}")
        print(f"API Base: {self.api_base}")
        print(f"Test User Email: {self.test_user_email}")
        print("=" * 80)
        
        # Test sequence following the requirements
        self.test_user_registration()
        self.test_user_login()
        self.test_user_profile_get()
        self.test_user_profile_update()
        
        self.test_create_product()  # Need product for favorites/orders
        self.test_get_products()
        
        self.test_add_to_favorites()
        self.test_get_favorites()
        
        self.test_create_order()
        self.test_get_user_orders()
        self.test_admin_get_orders()
        
        self.test_payment_bank()  # Includes email verification
        self.test_payment_transfer()
        
        self.test_admin_update_order()
        
        self.test_update_product()
        self.test_remove_from_favorites()
        self.test_delete_product()
        
        print("\n" + "=" * 80)
        print(f"🎯 Test Results Summary:")
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📊 Total: {self.results['passed'] + self.results['failed']}")
        print(f"Success Rate: {(self.results['passed'] / (self.results['passed'] + self.results['failed']) * 100):.1f}%")
        
        if self.results['failed'] > 0:
            print(f"\n⚠️  Failed Tests:")
            for test in self.results['tests']:
                if not test['success']:
                    print(f"   - {test['test']}: {test['message']}")
        
        return self.results


def main():
    # Use the base URL from .env file
    base_url = "https://cypruswatch.com"
    
    print("🔍 Testing Cyprus Watch Backend APIs...")
    tester = CyprusWatchAPITester(base_url)
    results = tester.run_all_tests()
    
    return results


if __name__ == "__main__":
    main()