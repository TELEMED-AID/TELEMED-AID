import React from "react";
import GenericPopup from "./Popup";

export const DeletePopup =(name,showDeletePopup,closePopup,ConfirmDelete,idToBeDeleted,deleteLoading,op="Delete")=> (
    <GenericPopup
        open={showDeletePopup}
        title= {`Confirm ${op}`}
        content={`Are you sure you want to ${op} this ${name}?`}
        buttons={[
            {
                text: "No",
                onClick: closePopup,
                color: "secondary",
                variant: "outlined",
            },
            {
                text: "Yes",
                onClick: () => ConfirmDelete(idToBeDeleted),
                color: "primary",
                variant: "contained",
                loading: deleteLoading,
            },
        ]}
    />
);
