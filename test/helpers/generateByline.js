/*!
 *  Copyright (c) 2025 American Mathematical Society
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { generateByline } from "../../lib/helpers/generateByline.js";
import tape from 'tape';


tape('Helpers: generateByline', async function (t) {
    t.plan(3);

    let sample = {
        "contribAs": [
            {
                "name": "Given Sur",
                "byline": "comment"
            },
            {
                "name": "Given2 Sur2",
            }
        ],
        "contribBs": [
            {
                "name": "Given Sur Jr.",
                "byline": "comment"
            }
        ]
    }

    t.equal(generateByline(sample), 'comment Given Sur and Given2 Sur2, comment Given Sur Jr.', 'generatByline: 2 contrib-groups, 2 contributors');

    sample = {
        "contribAs": [
            {
                "name": "Given Sur",
                "byline": "comment"
            },
            {
                "name": "Given2 Sur2",
            },
            {
                "name": "Given Sur Jr.",
            }
        ],
    }

    t.equal(generateByline(sample), 'comment Given Sur, Given2 Sur2, and Given Sur Jr.', 'generatByline: 1 contrib-groups, 3 contributors');

    sample = {
        "contribAs": [
            {
                "name": "Given Sur",
                "byline": "comment"
            },
        ],
        "contribBs": [
            {
                "name": "Given2 Sur2",
                "byline": "comment"
            },
            {
                "name": "Given Sur Jr.",
            }
        ],
        "contribCs": [
            {
                "name": "Given Sur3",
                "byline": "comment"
            },
        ],
    }

    t.equal(generateByline(sample), 'comment Given Sur, comment Given2 Sur2 and Given Sur Jr., comment Given Sur3', 'generatByline: 3 contrib-groups, 1+2+1 contributors');
});

