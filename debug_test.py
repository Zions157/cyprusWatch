import requests
import json
import urllib3

# Suppress SSL warnings for testing
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Simple test script
def test_endpoint(endpoint, data=None, method="GET"):
    url = f"https://cypruswatch.com/api/{endpoint}"
    print(f"\n🔍 Testing {method} {url}")
    
    try:
        if method == "GET":
            response = requests.get(url, verify=False, timeout=30)
        elif method == "POST":
            response = requests.post(url, json=data, verify=False, timeout=30, 
                                   headers={"Content-Type": "application/json"})
        
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        return response
    except Exception as e:
        print(f"Error: {e}")
        return None

# Test basic endpoints first
print("Testing basic connectivity...")

# Test products (known working)
test_endpoint("products", method="GET")

# Test auth registration
reg_data = {
    "email": "debug@test.com",
    "password": "testpass123",
    "fullName": "Debug User",
    "phone": "+90 533 123 4567",
    "address": "Test Address"
}
test_endpoint("auth/register", reg_data, method="POST")

# Test admin orders
test_endpoint("admin/orders", method="GET")