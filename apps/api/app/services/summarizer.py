from typing import List


def extractive_summary(text: str, max_sentences: int = 7) -> List[str]:
    """Naive heuristic summarizer for MVP.

    Splits text into sentences, scores them by length with position tie-breakers,
    and returns the top ``max_sentences`` ordered by appearance.
    """

    sentences = [
        s.strip()
        for s in text.replace("؟", ".").replace("!", ".").split(".")
        if s.strip()
    ]
    if not sentences:
        return []

    scored = [(idx, len(sentence)) for idx, sentence in enumerate(sentences)]
    scored.sort(key=lambda pair: (-pair[1], pair[0]))
    selected = sorted(scored[:max_sentences], key=lambda pair: pair[0])
    return [sentences[idx] for idx, _ in selected]
