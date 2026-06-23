from faker import Faker

from utils.payloads import valid_goal_payload
from utils.requests_helper import send_request

faker = Faker()


def test_update_goal_with_empty_body(team_id, valid_token):

    post_payload = valid_goal_payload()
    invalid_payload = {}

    #CREATE
    response = send_request("POST", f"/team/{team_id}/goal", valid_token, post_payload)
    assert response.status_code == 200
    goal_id = response.json()["goal"]["id"]
    assert goal_id is not None

    #UPDATE
    response = send_request("PUT", f"/goal/{goal_id}", valid_token, invalid_payload)
    assert response.status_code == 400

    #DELETE
    response = send_request("DELETE", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 200


def test_update_goal_with_invalid_goal_id(valid_token):

    payload = valid_goal_payload()
    invalid_goal_id = faker.uuid4()
    response = send_request("PUT", f"/goal/{invalid_goal_id}", valid_token, payload)
    assert response.status_code == 404
    body = response.json()
    assert "err" in body
    assert body["err"] == "Goal not found"


def test_update_goal_with_invalid_auth_api_key(team_id, valid_token, invalid_token):

    post_payload = valid_goal_payload()
    put_payload = valid_goal_payload()

    #CREATE
    response = send_request("POST", f"/team/{team_id}/goal", valid_token, post_payload)
    assert response.status_code == 200
    goal_id = response.json()["goal"]["id"]
    assert goal_id is not None

    #UPDATE
    response = send_request("PUT", f"/goal/{goal_id}", invalid_token, put_payload)
    assert response.status_code == 401
    body = response.json()
    assert "err" in body
    assert body["err"] == "Token invalid"
    assert "ECODE" in body
    assert body["ECODE"] == "OAUTH_025"

    #DELETE
    response = send_request("DELETE", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 200