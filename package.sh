#!/bin/bash

7z a -tzip releases/$1/env-impact-comparison.zip ./ -xr\!node_modules -xr\!.git -x\!releases
