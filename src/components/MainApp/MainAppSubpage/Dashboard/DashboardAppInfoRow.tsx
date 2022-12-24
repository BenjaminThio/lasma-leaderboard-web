import React from "react";
import {CodeBlock, dracula} from "react-code-blocks";
import {toast} from "react-toastify";

interface DashboardAppInfoRowProps {
    column1: string;
    column2: string;
}

function DashboardAppInfoRow(props: DashboardAppInfoRowProps) {
    return (
        <div className="dashboardapp-info-row">
            <div>
                {props.column1}
            </div>
            <div className="dashboardapp-info-row-column2" onClick={() => {
                navigator.clipboard.writeText(props.column2);
                toast.success(`Copied ${props.column1.split(":")[0]} to clipboard`);
            }}>
                <CodeBlock
                    text={props.column2}
                    language={"JavaScript"}
                    showLineNumbers={false}
                    theme={dracula}
                    wrapLines
                />
            </div>
        </div>
    )
}

export default DashboardAppInfoRow;