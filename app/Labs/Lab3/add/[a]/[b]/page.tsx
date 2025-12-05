export default function AddPathParameters({
    params,
}: {
    params: { a: string; b: string };
}) {
    const a = parseInt(params.a, 10);
    const b = parseInt(params.b, 10);

    return (
        <div id="wd-add">
            <h4>Encoding Path Parameters</h4>
            a = {a} b = {b} <br />
            a + b = {a + b}
            <hr />
        </div>
    );
}
