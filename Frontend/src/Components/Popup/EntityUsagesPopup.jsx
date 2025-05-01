import { Box, Typography } from "@mui/material";
import ExpandableList from "@Components/ExpandableList/ExpandableList";
import Popup from "@Components/Popup/Popup";
import WarningTitle from "@Components/WarningTitle/WarningTitle";

export default function EntityUsagesPopup({ open, sx, title, subtitle, entityTypeToNamesMap, labelsMap, buttons, maxWidth }) {

  const addEntityNamesToPopup = (names, entityName, label) => {
    return (
      <Box key={entityName}>
        <Typography >
          {label}
        </Typography>
        <ExpandableList
          items={names}
          maxLength={4}
        />
      </Box>
    );
  }

  const prepareContent = () => {
    const content = [<WarningTitle title={subtitle} />];
    if (entityTypeToNamesMap instanceof Object) {
      Object.keys(entityTypeToNamesMap).forEach((key) => {
        content.push(addEntityNamesToPopup(entityTypeToNamesMap[key], key, labelsMap[key]))
      })
    }

    return content;
  }

  return (
    <Popup
      open={open}
      sx={sx}
      title={title}
      content={prepareContent()}
      buttons={buttons}
      maxWidth={maxWidth}
    />
  );
}
