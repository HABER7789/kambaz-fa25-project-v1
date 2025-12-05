import Link from "next/link";

export default function PathParameters() {
    return (
        <div id="wd-path-parameters">
            <h4>Path Parameters</h4>
            <Link href="/Labs/Lab3/add/2/3">2 + 3</Link> <br />
            <Link href="/Labs/Lab3/add/5/7">5 + 7</Link>
            <hr />
        </div>
    );
}
