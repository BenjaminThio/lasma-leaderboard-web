import React from "react";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";

interface DashboardAppScoreboardRowProps {
    rank: number;
    name: string;
    uid: string;
    score: number;
    onClickEdit?: (userUID: string, userName: string, userScore: number) => void;
    onClickDelete?: (userUID: string, userName: string, userScore: number) => void;
}

function DashboardAppScoreboardRow(props: DashboardAppScoreboardRowProps) {
    return (
        <div className="dashboardapp-scoreboard-row">
            <div className="dashboardapp-scoreboard-rank">
                <div>
                    {"#" + props.rank.toString()}
                </div>
            </div>
            <div className="dashboardapp-scoreboard-name">
                <div>
                    {props.name}
                </div>
            </div>
            <div className="dashboardapp-scoreboard-score">
                <div>
                    {props.score}
                </div>
            </div>
            <div className="dashboardapp-scoreboard-actions">
                <Button variant="primary"
                        onClick={() => props.onClickEdit ? props.onClickEdit(props.uid, props.name, props.score) : undefined}>
                    Edit
                </Button>
                <Button variant="secondary" onClick={() => {
                    navigator.clipboard.writeText(props.uid);
                    toast.success(`Copied ${props.name}'s UID to clipboard`);
                }}>
                    Copy UID
                </Button>
                <Button variant="danger"
                        onClick={() => props.onClickDelete ? props.onClickDelete(props.uid, props.name, props.score) : undefined}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default DashboardAppScoreboardRow;