import { Form } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { InputGroup } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";

export default function BootstrapForms() {
    return (
        <div>
            <div id="wd-css-styling-forms">
                <h2>Forms</h2>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </div>
            <div id="wd-css-styling-dropdowns">
                <h3>Dropdowns</h3>
                <Form.Select>
                    <option value="0" defaultChecked>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </div>
            <div id="wd-css-styling-switches">
                <h3>Switches</h3>
                <Form.Check type="switch" defaultChecked={false} label="Unchecked switch checkbox input" />
                <Form.Check type="switch" defaultChecked={true} label="Checked switch checkbox input" />
                <Form.Check type="switch" defaultChecked={false} label="Unchecked disabled switch checkbox input" disabled />
                <Form.Check type="switch" defaultChecked={true} label="Checked disabled switch checkbox input" disabled />
            </div>
            <div id="wd-css-styling-range-and-sliders">
                <h3>Range</h3>
                <Form.Label>Example range</Form.Label>
                <Form.Range min="0" max="5" step="0.5" />
            </div>
            <div id="wd-css-styling-addons">
                <h3>Addons</h3>
                <InputGroup className="mb-3">
                    <InputGroupText>$</InputGroupText>
                    <InputGroupText>0.00</InputGroupText>
                    <Form.Control />
                </InputGroup>
                <InputGroup>
                    <Form.Control />
                    <InputGroupText>$</InputGroupText>
                    <InputGroupText>0.00</InputGroupText>
                </InputGroup>
            </div>

            <div id="wd-css-responsive-forms-1">
                <h3>Responsive forms</h3>
                <Row className="mb-3" controlid="email1">
                    <Form.Label column sm={2}> Email </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" defaultValue="email@example.com" />
                    </Col>
                </Row>
                <Row className="mb-3" controlid="password1">
                    <Form.Label column sm={2}> Password </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" />
                    </Col>
                </Row>
                <Row className="mb-3" controlid="textarea2">
                    <Form.Label column sm={2}> Bio </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" style={{ height: "100px" }} />
                    </Col>
                </Row>
            </div>
            <div id="wd-css-responsive-forms-2">
                <h3>Responsive forms 2</h3>
                <Form>
                    <Row className="mb-3" controlid="formHorizontalEmail">
                        <Form.Label column sm={2}> Email </Form.Label>
                        <Col sm={10}> <Form.Control type="email" placeholder="Email" /> </Col>
                    </Row>
                    <Row className="mb-3" controlid="formHorizontalPassword">
                        <Form.Label column sm={2}> Password </Form.Label>
                        <Col sm={10}> <Form.Control type="password" placeholder="Password" /> </Col>
                    </Row>
                    <fieldset>
                        <Row className="mb-3">
                            <Form.Label as="legend" column sm={2}> Radios </Form.Label>
                            <Col sm={10}>
                                <Form.Check type="radio" label="First radio" name="formHorizontalRadios" defaultChecked />
                                <Form.Check type="radio" label="Second radio" name="formHorizontalRadios" />
                                <Form.Check type="radio" label="Third radio" name="formHorizontalRadios" />
                                <Form.Check type="radio" label="Remember me" name="formHorizontalRadios" />
                            </Col>
                        </Row>
                    </fieldset>
                    <Col> <Button type="submit">Sign in</Button> </Col>
                </Form>
            </div>


        </div>
    );
}