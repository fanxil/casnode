// Copyright 2022 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import {withRouter} from "react-router-dom";
import * as Setting from "./Setting";
import i18next from "i18next";

class SilentSignin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  componentDidMount() {
    // https://stackoverflow.com/questions/25098021/securityerror-blocked-a-frame-with-origin-from-accessing-a-cross-origin-frame
    window.addEventListener("message", (event) => {
      const message = event.data;
      if (message.tag !== "Casdoor") {
        return;
      }

      if (message.type === "SilentSignin") {
        if (message.data === "success") {
          Setting.showMessageEx("success", i18next.t("login:Logged in successfully"), 1, () => Setting.goToLink("/"));
        } else if (message.data === "user-not-logged-in") {
          // Setting.showMessageEx("error", i18next.t("login:Failed to log in"), 1, () => Setting.goToLink("/"));
        }
      }
    });
  }

  render() {
    // don't silent-sign-in recursively in iframe
    if (Setting.inIframe()) {
      return null;
    }

    // only do silent-sign-in when user is not logged in
    if (this.props.account !== null) {
      return null;
    }

    return <iframe id="iframeTask" src={`${Setting.getSigninUrl()}&silentSignin=1`} style={{display: "none"}} width={0} height={0} frameBorder="no" />;
  }
}

export default withRouter(SilentSignin);
