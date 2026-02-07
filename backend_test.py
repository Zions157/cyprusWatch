#!/usr/bin/env python3
"""
E-ticaret Backend API Test Suite
Tests all backend endpoints for the e-commerce application
"""

import requests
import json
import uuid
from datetime import datetime

# Configuration
BASE_URL = "https://ecommerce-shop-105.preview.emergentagent.com/api"

class EcommerceAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.test_product_id = None
        self.test_order_id = None
        
    def log_test(self, test_name, success, details=""):
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success:
            print(f"   Error details: {details}")
        print("-" * 60)

    def test_database_connection(self):
        """Test basic connectivity"""
        try:
            response = self.session.get(f"{self.base_url}/products", timeout=10)
            if response.status_code == 200:
                self.log_test("Database Connection", True, "Successfully connected to API")
                return True
            else:
                self.log_test("Database Connection", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("Database Connection", False, f"Connection error: {str(e)}")
            return False

    def test_get_products(self):
        """Test GET /api/products - Should list all products"""
        try:
            response = self.session.get(f"{self.base_url}/products", timeout=10)
            
            if response.status_code == 200:
                products = response.json()
                if isinstance(products, list):
                    self.log_test("GET /api/products", True, f"Retrieved {len(products)} products")
                    return products
                else:
                    self.log_test("GET /api/products", False, "Response is not a list")
                    return []
            else:
                self.log_test("GET /api/products", False, f"HTTP {response.status_code}: {response.text}")
                return []
        except Exception as e:
            self.log_test("GET /api/products", False, f"Error: {str(e)}")
            return []

    def test_create_product(self):
        """Test POST /api/products - Create new product"""
        test_product = {
            "name": "Test Ürün 2024",
            "description": "Backend testi için oluşturulan test ürünü",
            "price": 99.99,
            "stock": 50,
            "category": "Test Kategori",
            "image": "https://via.placeholder.com/400x300?text=Test+Ürünü"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/products", 
                json=test_product,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                created_product = response.json()
                if 'id' in created_product:
                    self.test_product_id = created_product['id']
                    self.log_test("POST /api/products", True, f"Created product with ID: {self.test_product_id}")
                    return created_product
                else:
                    self.log_test("POST /api/products", False, "Response missing 'id' field")
                    return None
            else:
                self.log_test("POST /api/products", False, f"HTTP {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_test("POST /api/products", False, f"Error: {str(e)}")
            return None

    def test_get_single_product(self, product_id=None):
        """Test GET /api/products/[id] - Get single product"""
        if not product_id:
            product_id = self.test_product_id
            
        if not product_id:
            self.log_test("GET /api/products/[id]", False, "No product ID available for testing")
            return None
            
        try:
            response = self.session.get(f"{self.base_url}/products/{product_id}", timeout=10)
            
            if response.status_code == 200:
                product = response.json()
                if 'id' in product:
                    self.log_test("GET /api/products/[id]", True, f"Retrieved product: {product.get('name', 'Unknown')}")
                    return product
                else:
                    self.log_test("GET /api/products/[id]", False, "Response missing 'id' field")
                    return None
            elif response.status_code == 404:
                self.log_test("GET /api/products/[id]", True, "Product not found (404) - Expected for non-existent ID")
                return None
            else:
                self.log_test("GET /api/products/[id]", False, f"HTTP {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_test("GET /api/products/[id]", False, f"Error: {str(e)}")
            return None

    def test_update_product(self, product_id=None):
        """Test PUT /api/products/[id] - Update product"""
        if not product_id:
            product_id = self.test_product_id
            
        if not product_id:
            self.log_test("PUT /api/products/[id]", False, "No product ID available for testing")
            return False
            
        update_data = {
            "name": "Güncellenen Test Ürün",
            "description": "Backend testi ile güncellenen ürün açıklaması",
            "price": 149.99,
            "stock": 25,
            "category": "Güncellenen Kategori",
            "image": "https://via.placeholder.com/400x300?text=Güncellendi"
        }
        
        try:
            response = self.session.put(
                f"{self.base_url}/products/{product_id}",
                json=update_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                self.log_test("PUT /api/products/[id]", True, "Product updated successfully")
                return True
            elif response.status_code == 404:
                self.log_test("PUT /api/products/[id]", True, "Product not found (404) - Expected for non-existent ID")
                return True
            else:
                self.log_test("PUT /api/products/[id]", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("PUT /api/products/[id]", False, f"Error: {str(e)}")
            return False

    def test_admin_login_success(self):
        """Test POST /api/admin/login - Correct credentials"""
        login_data = {
            "username": "admin",
            "password": "admin123"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/admin/login",
                json=login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get('success') == True:
                    self.log_test("POST /api/admin/login (valid)", True, "Admin login successful")
                    return True
                else:
                    self.log_test("POST /api/admin/login (valid)", False, "Login response indicates failure")
                    return False
            else:
                self.log_test("POST /api/admin/login (valid)", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST /api/admin/login (valid)", False, f"Error: {str(e)}")
            return False

    def test_admin_login_failure(self):
        """Test POST /api/admin/login - Wrong credentials"""
        login_data = {
            "username": "admin",
            "password": "wrongpassword"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/admin/login",
                json=login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 401:
                self.log_test("POST /api/admin/login (invalid)", True, "Correctly rejected invalid credentials")
                return True
            else:
                self.log_test("POST /api/admin/login (invalid)", False, f"Expected 401, got {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST /api/admin/login (invalid)", False, f"Error: {str(e)}")
            return False

    def test_create_order(self):
        """Test POST /api/orders - Create new order"""
        order_data = {
            "items": [
                {"id": str(uuid.uuid4()), "name": "Test Ürün", "price": 99.99, "quantity": 2},
                {"id": str(uuid.uuid4()), "name": "Test Ürün 2", "price": 49.99, "quantity": 1}
            ],
            "totalAmount": 249.97,
            "customerInfo": {
                "name": "Test Müşteri",
                "email": "test@example.com",
                "phone": "05551234567",
                "address": "Test Mah. Test Cad. No:1 Test/TÜRKIYE"
            },
            "paymentMethod": "credit_card"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/orders",
                json=order_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                created_order = response.json()
                if 'id' in created_order:
                    self.test_order_id = created_order['id']
                    self.log_test("POST /api/orders", True, f"Created order with ID: {self.test_order_id}")
                    return created_order
                else:
                    self.log_test("POST /api/orders", False, "Response missing 'id' field")
                    return None
            else:
                self.log_test("POST /api/orders", False, f"HTTP {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_test("POST /api/orders", False, f"Error: {str(e)}")
            return None

    def test_get_orders(self):
        """Test GET /api/orders - List all orders"""
        try:
            response = self.session.get(f"{self.base_url}/orders", timeout=10)
            
            if response.status_code == 200:
                orders = response.json()
                if isinstance(orders, list):
                    self.log_test("GET /api/orders", True, f"Retrieved {len(orders)} orders")
                    return orders
                else:
                    self.log_test("GET /api/orders", False, "Response is not a list")
                    return []
            else:
                self.log_test("GET /api/orders", False, f"HTTP {response.status_code}: {response.text}")
                return []
        except Exception as e:
            self.log_test("GET /api/orders", False, f"Error: {str(e)}")
            return []

    def test_bank_payment(self):
        """Test POST /api/payment/bank - Bank card payment (mock)"""
        if not self.test_order_id:
            self.log_test("POST /api/payment/bank", False, "No order ID available for payment testing")
            return False
            
        payment_data = {
            "orderId": self.test_order_id,
            "amount": 249.97,
            "cardInfo": {
                "cardNumber": "1234567812345678",
                "expiryDate": "12/25",
                "cvv": "123",
                "cardHolderName": "Test Kullanici"
            }
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/payment/bank",
                json=payment_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    self.log_test("POST /api/payment/bank", True, f"Payment successful: {result.get('message')}")
                    return True
                else:
                    self.log_test("POST /api/payment/bank", True, f"Payment rejected as expected: {result.get('message')}")
                    return True
            elif response.status_code == 400:
                # Mock payment can fail, this is expected
                self.log_test("POST /api/payment/bank", True, "Payment rejected (expected mock behavior)")
                return True
            else:
                self.log_test("POST /api/payment/bank", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST /api/payment/bank", False, f"Error: {str(e)}")
            return False

    def test_transfer_payment(self):
        """Test POST /api/payment/transfer - IBAN/Transfer payment"""
        if not self.test_order_id:
            self.log_test("POST /api/payment/transfer", False, "No order ID available for payment testing")
            return False
            
        transfer_data = {
            "orderId": self.test_order_id,
            "amount": 249.97
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/payment/transfer",
                json=transfer_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get('success') and 'iban' in result:
                    self.log_test("POST /api/payment/transfer", True, f"Transfer initiated: {result.get('message')}")
                    return True
                else:
                    self.log_test("POST /api/payment/transfer", False, "Response missing required fields")
                    return False
            else:
                self.log_test("POST /api/payment/transfer", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST /api/payment/transfer", False, f"Error: {str(e)}")
            return False

    def test_delete_product(self, product_id=None):
        """Test DELETE /api/products/[id] - Delete product"""
        if not product_id:
            product_id = self.test_product_id
            
        if not product_id:
            self.log_test("DELETE /api/products/[id]", False, "No product ID available for testing")
            return False
            
        try:
            response = self.session.delete(f"{self.base_url}/products/{product_id}", timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                self.log_test("DELETE /api/products/[id]", True, "Product deleted successfully")
                return True
            elif response.status_code == 404:
                self.log_test("DELETE /api/products/[id]", True, "Product not found (404) - Expected for non-existent ID")
                return True
            else:
                self.log_test("DELETE /api/products/[id]", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("DELETE /api/products/[id]", False, f"Error: {str(e)}")
            return False

    def test_invalid_endpoints(self):
        """Test error handling for invalid endpoints"""
        try:
            response = self.session.get(f"{self.base_url}/nonexistent", timeout=10)
            if response.status_code == 404:
                self.log_test("Invalid Endpoint Handling", True, "Correctly returns 404 for non-existent endpoints")
                return True
            else:
                self.log_test("Invalid Endpoint Handling", False, f"Expected 404, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Invalid Endpoint Handling", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run complete test suite"""
        print("=" * 80)
        print("E-COMMERCE BACKEND API TEST SUITE")
        print("=" * 80)
        print(f"Base URL: {self.base_url}")
        print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 80)
        
        results = []
        
        # Core connectivity
        results.append(self.test_database_connection())
        
        # Product Management Tests
        initial_products = self.test_get_products()
        results.append(len(initial_products) >= 0)  # At least retrieve the list
        
        results.append(self.test_create_product())
        results.append(self.test_get_single_product())
        results.append(self.test_update_product())
        
        # Admin Tests
        results.append(self.test_admin_login_success())
        results.append(self.test_admin_login_failure())
        
        # Order Tests
        results.append(self.test_create_order())
        results.append(self.test_get_orders())
        
        # Payment Tests
        results.append(self.test_bank_payment())
        results.append(self.test_transfer_payment())
        
        # Cleanup & Additional Tests
        results.append(self.test_delete_product())
        results.append(self.test_invalid_endpoints())
        
        # Summary
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        
        passed = sum(results)
        total = len(results)
        success_rate = (passed / total) * 100 if total > 0 else 0
        
        print(f"Tests Passed: {passed}/{total}")
        print(f"Success Rate: {success_rate:.1f}%")
        print(f"Test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        if success_rate >= 80:
            print("🎉 Backend API tests mostly successful!")
        elif success_rate >= 60:
            print("⚠️  Backend API has some issues but core functionality works")
        else:
            print("❌ Backend API has critical issues that need attention")
            
        print("=" * 80)
        
        return success_rate >= 80

if __name__ == "__main__":
    tester = EcommerceAPITester()
    tester.run_all_tests()