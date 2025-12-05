
"use client";

import Link from "next/link";
import Image from "next/image";

const COURSE = "CS 5610";
const YOUR_NAME = "Dhairya Pinakinkumar Patel";
const REPO = "https://github.com/HABER7789/kambaz-next-js-fa25";
const SECTION ="SEC 05 FALL 2025"


export default function Lab1() {
    return (

        <div id="wd-lab1">
            <header style={{ marginBottom: 16 }}>
                <h2>Lab 1: HTML Examples</h2>
                <p>Full Name: {YOUR_NAME}</p>
                <p>
                    GitHub repository:{" "}
                    <a href={REPO} target="_blank" rel="noreferrer">{REPO}</a>
                </p>
                <p>
                    Course: {COURSE} Section: {SECTION}
                </p>
                <ul>
                    <li><Link href="/Labs/Lab1">Lab 1: HTML Examples</Link></li>
                    <li><Link href="/Labs/Lab2">Lab 2: CSS Basics</Link></li>
                    <li><Link href="/Labs/Lab3">Lab 3: JavaScript Fundamentals</Link></li>
                </ul>
                <hr />
            </header>

            <h2>Lab 1</h2>
            <h3>HTML Examples</h3>
            <div id="wd-h-tag">
                <h4>Heading Tags</h4>
                Text documents are often broken up into several sections and subsections. Each section is usually prefaced with a short title or heading that attempts to summarize the topic of the section it precedes. For instance this paragraph is preceded by the heading Heading Tags. The font of the section headings are usually larger and bolder than their subsection headings. This document uses headings to introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used to format plain text so that it renders in a browser as large headings. There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest heading.
            </div>
            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                <p id="wd-p-1">
                    This is a paragraph. We often separate a long set of sentences with vertical spaces to make the text easier to read. Browsers ignore vertical white spaces and render all the text as one single set of sentences. To force the browser to add vertical spacing, wrap the paragraphs you want to separate with the paragraph tag{" "}
                </p>
                <p id="wd-p-2">
                    This is the first paragraph. The paragraph tag is used to format
                    vertical gaps between long pieces of text like this one.
                </p>
                <p id="wd-p-3">
                    This is the second paragraph. Even though there is a deliberate white
                    gap between the paragraph above and this paragraph, by default
                    browsers render them as one contiguous piece of text as shown here on
                    the right.
                </p>
                <p id="wd-p-4">
                    This is the third paragraph. Wrap each paragraph with the paragraph
                    tag to tell browsers to render the gaps.
                </p>
            </div>
            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Pour batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>
                My favorite recipe:
                <ol id="wd-your-favorite-recipe">
                    <li>Marinate Chicken Thighs.</li>
                    <li>Add sliced potatoes.</li>
                    <li>Mix well.</li>
                    <li>Pre-heat an airfryer at 350 degrees for 5 mins.</li>
                    <li>Place chicken and potatoes with some olive oil on the air fryer sheet.</li>
                    <li>Spray some olive oil before starting the air fryer.</li>
                    <li>Flip and cook the chicken and potatoes for about 18 minutes.</li>
                    <li>Serve and enjoy!</li>
                </ol>
                <h5>Unordered List Tag</h5>
                My favorite books (in no particular order)
                <ul id="wd-my-books">
                    <li>Dune</li>
                    <li>Lord of the Rings</li>
                    <li>Ender&apos;s Game</li>
                    <li>Red Mars</li>
                    <li>The Forever War</li>
                </ul>
                Your favorite books (in no particular order)
                <ul id="wd-your-books">
                    <li>Theory of Everything</li>
                    <li>Quantum Computation by Nielsen and Chuang</li>
                    <li>Harry Potter and the Order of the Phoenix</li>
                </ul>
                <div id="wd-tables">
                    <h4>Table Tag</h4>
                    <table border={1} width="100%">
                        <thead>
                            <tr>
                                <th>Quiz</th>
                                <th>Topic</th>
                                <th>Date</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Q1</td>
                                <td>HTML</td>
                                <td>2/3/21</td>
                                <td>85</td>
                            </tr>
                            <tr>
                                <td>Q2</td>
                                <td>Java</td>
                                <td>2/10/21</td>
                                <td>95</td>
                            </tr>
                            <tr>
                                <td>Q3</td>
                                <td>C++</td>
                                <td>2/17/21</td>
                                <td>90</td>
                            </tr>
                            <tr>
                                <td>Q4</td>
                                <td>Python</td>
                                <td>2/24/21</td>
                                <td>45</td>
                            </tr>
                            <tr>
                                <td>Q5</td>
                                <td>Q#</td>
                                <td>3/1/21</td>
                                <td>65</td>
                            </tr>
                            <tr>
                                <td>Q6</td>
                                <td>Swift</td>
                                <td>3/8/21</td>
                                <td>85</td>
                            </tr>
                            <tr>
                                <td>Q7</td>
                                <td>C#</td>
                                <td>3/15/21</td>
                                <td>90</td>
                            </tr>
                            <tr>
                                <td>Q8</td>
                                <td>C</td>
                                <td>3/20/21</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <td>Q9</td>
                                <td>JavaScript</td>
                                <td>3/22/21</td>
                                <td>40</td>
                            </tr>
                            <tr>
                                <td>Q10</td>
                                <td>CSS</td>
                                <td>2/27/21</td>
                                <td>75</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>Average</td>
                                <td>73</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div id="wd-images">
                    <h4>Image tag</h4>
                    Loading an image from the internet: <br />
                    <Image
                        id="wd-starship"
                        src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
                        alt="SpaceX Starship on the launch mount"
                        width={800}   // intrinsic width (pick a sensible size)
                        height={533}  // intrinsic height (maintains aspect ratio)
                        priority      // since it's above the fold in a lab, loads eagerly
                        style={{ width: "400px", height: "auto" }} // matches your previous 400px display
                        unoptimized
                    />
                    <br />
                    Loading a local image:
                    <br />
                    <Image
                        id="wd-teslabot"
                        src="/images/teslabot.jpg"  // from /public/images/teslabot.jpg
                        alt="Tesla Bot prototype"
                        width={300}
                        height={200}
                    />
                </div>
                <div id="wd-forms">
                    <h4>Form Elements</h4>
                    <form id="wd-text-fields">
                        <h5>Text Fields</h5>
                        <label htmlFor="wd-text-fields-username">Username:</label>
                        <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
                        <label htmlFor="wd-text-fields-password">Password:</label>
                        <input type="password" defaultValue="123@#$asd" id="wd-text-fields-password" />
                        <br />
                        <label htmlFor="wd-text-fields-first-name">First name:</label>
                        <input type="text" title="John" id="wd-text-fields-first-name" /> <br />
                        <label htmlFor="wd-text-fields-last-name">Last name:</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            defaultValue="Wonderland"
                            title="The last name"
                            id="wd-text-fields-last-name"
                        />
                        {/* copy rest of form elements here  */}
                    </form>
                </div>

                <h5>Text boxes</h5>
                <label>Biography:</label>
                <br />
                <textarea
                    id="wd-textarea"
                    cols={30}
                    rows={10}
                    defaultValue="Quisque id finibus metus, fringilla elementum enim. Fusce nec eros ut ante consequat mollis porttitor id enim. Maecenas tristique velit sem, eget suscipit augue pharetra et. Quisque venenatis sem et ipsum gravida, eu scelerisque mi blandit. Morbi hendrerit, velit non laoreet pretium, lacus erat tristique libero, id scelerisque magna mi in tortor. Duis semper feugiat arcu non pulvinar. Cras a ex eget orci suscipit fermentum nec at velit. Nam ullamcorper dignissim auctor. Vestibulum facilisis cursus lectus sit amet consequat."
                />

                <h5 id="wd-buttons">Buttons</h5>
                <button type="button" onClick={() => alert("Life is Good!")} id="wd-all-good">
                    Hello World!
                </button>

                {/* File Upload */}
                <h5 id="wd-file-upload">File Upload</h5>
                <label htmlFor="wd-file">Upload a file:</label>
                <input type="file" id="wd-file" name="wd-file" />
                <br />

                <h5 id="wd-radio-buttons">Radio buttons</h5>

                <label>Favorite movie genre:</label>
                <br />

                <input type="radio" name="radio-genre" id="wd-radio-comedy" />
                <label htmlFor="wd-radio-comedy">Comedy</label>
                <br />

                <input type="radio" name="radio-genre" id="wd-radio-drama" />
                <label htmlFor="wd-radio-drama">Drama</label>
                <br />

                <input type="radio" name="radio-genre" id="wd-radio-scifi" />
                <label htmlFor="wd-radio-scifi">Science Fiction</label>
                <br />
                <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
                <label htmlFor="wd-radio-fantasy">Fantasy</label>

                <h5 id="wd-checkboxes">Checkboxes</h5>
                <label>Favorite movie genre:</label>
                <br />

                <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
                <label htmlFor="wd-chkbox-comedy">Comedy</label>
                <br />

                <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
                <label htmlFor="wd-chkbox-drama">Drama</label>
                <br />

                <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
                <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
                <br />

                <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
                <label htmlFor="wd-chkbox-fantasy">Fantasy</label>

                <h4 id="wd-dropdowns">Dropdowns</h4>

                <h5>Select one</h5>
                <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label>
                <br />
                {/* Use defaultValue instead of selected on <option> */}
                <select id="wd-select-one-genre" defaultValue="SCIFI">
                    <option value="COMEDY">Comedy</option>
                    <option value="DRAMA">Drama</option>
                    <option value="SCIFI">Science Fiction</option>
                    <option value="FANTASY">Fantasy</option>
                </select>

                <h5>Select many</h5>
                <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label>
                <br />
                {/* Multi-select: defaultValue is an array */}
                <select multiple id="wd-select-many-genre" defaultValue={["COMEDY", "SCIFI"]}>
                    <option value="COMEDY">Comedy</option>
                    <option value="DRAMA">Drama</option>
                    <option value="SCIFI">Science Fiction</option>
                    <option value="FANTASY">Fantasy</option>
                </select>

                <h4>Other HTML field types</h4>

                <label htmlFor="wd-text-fields-email"> Email: </label>
                <input type="email" placeholder="jdoe@somewhere.com" id="wd-text-fields-email" />
                <br />

                <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
                {/* Use defaultValue to avoid controlled-without-onChange warning */}
                <input
                    type="number"
                    defaultValue={100000}
                    placeholder="1000"
                    id="wd-text-fields-salary-start"
                />
                <br />

                <label htmlFor="wd-text-fields-rating"> Rating: </label>
                <input type="range" defaultValue={4} max={5} placeholder="Doe" id="wd-text-fields-rating" />
                <br />

                <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
                <input type="date" defaultValue="2000-01-21" id="wd-text-fields-dob" />
                <br />

                <h4>Anchor tag</h4>
                Please <a href="https://www.lipsum.com" id="wd-lipsum">click here</a> to get dummy text
                <br />
            </div>
        </div>
    );
}
