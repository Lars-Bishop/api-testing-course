from faker import Faker

from utils.payloads import valid_goal_payload
from utils.requests_helper import send_request

faker = Faker()


def test_delete_deleted_goal(team_id, valid_token):

    payload = valid_goal_payload()

    #CREATE
    response = send_request("POST", f"/team/{team_id}/goal", valid_token, payload)
    assert response.status_code == 200
    goal_id = response.json()["goal"]["id"]
    assert goal_id is not None

    #DELETE
    response = send_request("DELETE", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 200
    assert response.json() == {}

    #DELETE
    response = send_request("DELETE", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 404
    body = response.json()
    assert "err" in body
    assert body["err"] == "Goal Not Found"


def test_delete_goal_with_invalid_goal_id(valid_token):
    invalid_goal_id = faker.uuid4()
    response = send_request("DELETE", f"/goal/{invalid_goal_id}", valid_token)
    assert response.status_code == 404
    body = response.json()
    assert "err" in body
    assert body["err"] == "Goal Not Found"


def test_delete_goal_with_invalid_auth_api_key(team_id, valid_token, invalid_token):

    payload = valid_goal_payload()

    #CREATE
    response = send_request("POST", f"/team/{team_id}/goal", valid_token, payload)
    assert response.status_code == 200
    goal_id = response.json()["goal"]["id"]
    assert goal_id is not None

    #DELETE
    response = send_request("DELETE", f"/goal/{goal_id}", invalid_token)
    assert response.status_code == 401
    body = response.json()
    assert "err" in body
    assert body["err"] == "Token invalid"
    assert "ECODE" in body
    assert body["ECODE"] == "OAUTH_025"

    #DELETE
    response = send_request("DELETE", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 200