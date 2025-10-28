import { Client } from "@gradio/client";

const client = await Client.connect("aubynsamuel05/nli_checks");

export async function POST(request: Request) {
    try {
        const { headline } = await request.json();
        const result = await client.predict("/predict", {
            raw_headline: headline,
        });
        // console.log(result.data);

        return new Response(
            JSON.stringify({ data: result.data }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error calling Gradio:", error);
        return new Response(
            JSON.stringify({ message: "Failed to analyze headline" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
