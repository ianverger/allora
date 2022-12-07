import { deleteActivity } from "../../store/activities"

function ActivityMenu ({open, menuButton, activityActions}) {


    return (
        <>
        <div id="activity-dropdown-container">
            {menuButton}
            { open ? (
                <div id="activity-actions">
                    {activityActions.map((action, idx) => (
                        <div key={idx} id='dropdown-items'>{action}</div>
                    ))}
                </div>
            ): null}

        </div>
        </>
    )
}

export default ActivityMenu;