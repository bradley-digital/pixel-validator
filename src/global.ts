const Messages = {
  StartStorage: {
    status: "success",
    event: "start_storage",
  },
  StopStorage: {
    status: "success",
    event: "stop_storage",
  },
  StartWebRequests: {
    status: "success",
    event: "start_web_requests",
  },
  StopWebRequests: {
    status: "success",
    event: "stop_web_requests",
  },
  SendMessageFailed: {
    status: "fail",
    event: "send_message_failed",
  },
  SendMessageErrored: {
    status: "fail",
    event: "send_message_errored",
  },
};

export default Messages;
