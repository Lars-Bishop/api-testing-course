import requests


def test_get_goal():
    response = requests.get('https://api.clickup.com/api/v2/team/90121739308/goal')
    assert response.status_code == 200