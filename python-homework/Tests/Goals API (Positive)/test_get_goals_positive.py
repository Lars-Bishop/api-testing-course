from utils.requests_helper import send_request


def test_get_goals(team_id, valid_token):

    response = send_request("GET", f"/team/{team_id}/goal", valid_token)

    assert response.status_code == 200

    body = response.json()

    assert "goals" in body
    assert isinstance(body["goals"], list)