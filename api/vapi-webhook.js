export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {

    const body = req.body;

    console.log("Webhook received from Vapi");

    const structured =
      body.message.artifact.structuredOutputs[
        "33dd9c36-7ddd-4d09-9b70-5fa01aeabe10"
      ];

    const scores = structured.result;

    const grammar = scores.grammar_score;
    const vocabulary = scores.vocabulary_score;
    const overall = scores.overall_score;

    console.log("Scores:", grammar, vocabulary, overall);

    // Aquí luego puedes guardar en Supabase

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Webhook processing failed"
    });

  }
}