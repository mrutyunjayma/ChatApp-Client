import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constans/colors";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt, creator } = message;

  const sameSender = sender?._id === user?._id;

  const isAdmin = sender?._id === creator;

  const formattedTime = moment(createdAt).format("LT");
  const formattedDate = moment(createdAt).format("MMM DD, YYYY");
  const isOlderThan24Hours = moment().diff(moment(createdAt), "hours") > 24;

  const timeToShow = isOlderThan24Hours
    ? `${formattedDate} at ${formattedTime}`
    : formattedTime;

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "lightgrey" : "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
        marginLeft: "1rem",
        marginRight: "1rem",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
          {isAdmin && "(Admin)"}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeToShow}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
