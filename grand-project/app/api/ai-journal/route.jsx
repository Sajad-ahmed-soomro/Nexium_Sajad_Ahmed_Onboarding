export default async function handler(req, res) {
    const { journal } = req.body;
  
    // Replace with actual n8n webhook call this si 
    const response = await fetch("https://eoqz5hhqjs3l96h.m.pipedream.net", {...})
  
    const fakeResponse = {
      summary: "You're feeling a mix of stress and hope today. You’ve had a tough morning but see signs of recovery.",
      questions: [
        "What triggered the stress this morning?",
        "What made you feel hopeful later?",
        "Is there something you can do to improve tomorrow?"
      ],
    };
  
    res.status(200).json(fakeResponse);
  }

  