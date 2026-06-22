import requests

headers_variable = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'pk_296698589_LLL3L6732YNOSAX3ANMM89RNVYPHSRBC '
}

def test_post_goal():
    response = requests.post('https://api.clickup.com/api/v2/team/90121739308/goal', headers=headers_variable, json={"name": "test1", "due_date": "1568036964079", "description": "test1test1", "multiple_owners": "true", "color": "#2b5c3d"})
    assert response.status_code == 200


def test_get_goal():
    response = requests.get('https://api.clickup.com/api/v2/team/90121739308/goal', headers=headers_variable)
    assert response.status_code == 200

    
def test_delete_goal():
    response = requests.get('https://api.clickup.com/api/v2/team/90121739308/goal', headers=headers_variable)
    assert response.status_code == 200


