from utils.requests_helper import send_request
from faker import Faker

faker = Faker()


def test_get_goals_with_invalid_team_id(valid_token):

    invalid_team_id = faker.random_number(digits=10)
    response = send_request("GET", f"/team/{invalid_team_id}/goal", valid_token)
    assert response.status_code == 401
    body = response.json()
    assert "err" in body
    assert body["err"] == "Workspace not authorized"
    assert "ECODE" in body
    assert body["ECODE"] == "OAUTH_192"


def test_get_goals_with_invalid_auth_api_key(team_id, invalid_token):

    response = send_request("GET", f"/team/{team_id}/goal", invalid_token)
    assert response.status_code == 401
    body = response.json()
    assert "err" in body
    assert body["err"] == "Token invalid"
    assert "ECODE" in body
    assert body["ECODE"] == "OAUTH_025"