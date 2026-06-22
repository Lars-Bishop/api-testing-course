from utils.payloads import valid_goal_payload
from utils.requests_helper import send_request


def test_delete_goal(team_id, valid_token):

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

    #GET
    response = send_request("GET", f"/goal/{goal_id}", valid_token)
    assert response.status_code == 404
    body = response.json()
    assert "err" in body
    assert body["err"] == "Goal Not Found"