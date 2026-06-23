import requests

from utils.config import BASE_URL


def send_request(method, endpoint, token, payload=None):

    headers = {
        "Authorization": token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    return requests.request(
        method=method,
        url=f"{BASE_URL}{endpoint}",
        headers=headers,
        json=payload
    )