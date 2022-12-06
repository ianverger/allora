import { deleteActivity } from "../../store/activities"

function ActivityMenu ({open, menuButton, activityActions}) {


    return (
        <>
        <div id="activity-dropdown-container">
            {menuButton}
            { open ? (
                <ul id="activity-actions">
                    {activityActions.map((action, idx) => (
                        <li key={idx} id='dropdown-items'>{action}</li>
                    ))}
                </ul>
            ): null}

        </div>
        </>
    )
}

export default ActivityMenu;