"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import * as client from "../../../client";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [attemptCount, setAttemptCount] = useState(0);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await client.findQuizById(qid as string);
                setQuiz(data);

                // Get attempt count for students
                if (!isFaculty) {
                    const count = await client.getAttemptCount(qid as string);
                    setAttemptCount(count.count || 0);
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [qid, isFaculty]);

    if (loading) return <div className="p-3">Loading quiz details...</div>;
    if (!quiz) return <div className="p-3">Quiz not found.</div>;

    const canTakeQuiz = () => {
        if (isFaculty) return false;
        if (!quiz.multipleAttempts && attemptCount >= 1) return false;
        if (quiz.multipleAttempts && attemptCount >= quiz.howManyAttempts) return false;
        return true;
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return (
        <div className="p-3">
            {/* Action buttons */}
            <div className="d-flex justify-content-center gap-2 mb-4">
                {isFaculty ? (
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)}
                        >
                            Preview
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
                        >
                            Edit
                        </Button>
                    </>
                ) : (
                    <>
                        {canTakeQuiz() ? (
                            <Button
                                variant="danger"
                                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}
                            >
                                Start Quiz
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/results`)}
                            >
                                View Results
                            </Button>
                        )}
                        <div className="text-muted small mt-2">
                            Attempts: {attemptCount} / {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
                        </div>
                    </>
                )}
            </div>

            <hr />

            {/* Quiz title */}
            <h2>{quiz.title}</h2>

            {/* Quiz properties table */}
            <Table borderless className="w-auto">
                <tbody>
                    <tr>
                        <td className="text-end pe-3"><b>Quiz Type</b></td>
                        <td>{quiz.quizType}</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>Points</b></td>
                        <td>{quiz.points}</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>Assignment Group</b></td>
                        <td>{quiz.assignmentGroup}</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>Shuffle Answers</b></td>
                        <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>Time Limit</b></td>
                        <td>{quiz.timeLimit} Minutes</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>Multiple Attempts</b></td>
                        <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
                    </tr>
                    {quiz.multipleAttempts && (
                        <tr>
                            <td className="text-end pe-3"><b>How Many Attempts</b></td>
                            <td>{quiz.howManyAttempts}</td>
                        </tr>
                    )}
                    <tr>
                        <td className="text-end pe-3"><b>Show Correct Answers</b></td>
                        <td>{quiz.showCorrectAnswers}</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>Access Code</b></td>
                        <td>{quiz.accessCode || "None"}</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>One Question at a Time</b></td>
                        <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>Webcam Required</b></td>
                        <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="text-end pe-3"><b>Lock Questions After Answering</b></td>
                        <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                    </tr>
                </tbody>
            </Table>

            {/* Dates table */}
            <Table bordered className="mt-4">
                <thead>
                    <tr>
                        <th>Due</th>
                        <th>For</th>
                        <th>Available from</th>
                        <th>Until</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{formatDate(quiz.dueDate)}</td>
                        <td>Everyone</td>
                        <td>{formatDate(quiz.availableDate)}</td>
                        <td>{formatDate(quiz.untilDate)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}