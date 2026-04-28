export async function GET(request: Request) {
    const response = await fetch("http://localhost:8000/api/todos");
    const data = await response.json();
    return Response.json(data);
}

export async function POST(request: Request) {
    const response = await fetch("http://localhost:8000/api/todos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request.body),
    });
    const data = await response.json();
    return Response.json(data);
}