// Copyright 2021 The casbin Authors. All Rights Reserved.
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

package object

import (
	"strconv"

	"github.com/astaxie/beego"
	"github.com/casdoor/casdoor-go-sdk/casdoorsdk"
)

func GetUserField(user *casdoorsdk.User, field string) string {
	return user.Properties[field]
}

func GetUserFieldInt(user *casdoorsdk.User, field string) int {
	res, err := strconv.Atoi(user.Properties[field])
	if err != nil {
		panic(err)
	}

	return res
}

func SetUserField(user *casdoorsdk.User, field string, value string) {
	if user.Properties == nil {
		user.Properties = map[string]string{}
	}
	user.Properties[field] = value
}

func getInitScore() int {
	score, err := strconv.Atoi(beego.AppConfig.String("initScore"))
	if err != nil {
		panic(err)
	}

	return score
}
