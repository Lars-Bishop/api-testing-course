from utils.payloads import valid_goal_payload
from utils.requests_helper import send_request


def test_create_goal_with_req_field_missing(team_id, valid_token):

    payload = valid_goal_payload()

    del payload["name"]

    response = send_request("POST", f"/team/{team_id}/goal", valid_token, payload)

    assert response.status_code == 500

    body = response.json()

    assert "err" in body
    assert body["err"] == "Internal Server Error"

    assert "ECODE" in body
    assert body["ECODE"] == "GOAL_005"


def test_create_goal_with_invalid_auth_api_key(team_id, invalid_token):

    payload = valid_goal_payload()

    response = send_request("POST", f"/team/{team_id}/goal", invalid_token, payload)

    assert response.status_code == 401

    body = response.json()

    assert "err" in body
    assert body["err"] == "Token invalid"

    assert "ECODE" in body
    assert body["ECODE"] == "OAUTH_025"