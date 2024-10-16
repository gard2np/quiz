import React, { useState } from "react";
import { Button, Typography, Paper, List, ListItem, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

interface IncorrectQuestion {
    문제: string;
    정답: string;
    입력한_답: string;
}

interface ResultsComponentProps {
    score: number;
    totalQuestions: number;
    incorrectQuestions: IncorrectQuestion[];
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ score, totalQuestions, incorrectQuestions }) => {
    const [open, setOpen] = useState(false);  // 모달 열림/닫힘 상태 관리

    const handleClickOpen = () => {
        setOpen(true);  // 모달 열기
    };

    const handleClose = () => {
        setOpen(false);  // 모달 닫기
    };

    return (
        <Paper elevation={0} style={{
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',  // 하단 정렬
            minHeight: '80vh',  // 화면 전체 높이 사용
            paddingBottom: '20px',  // 하단에서 50px 여백
        }}>
            <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
                퀴즈 결과
            </Typography>

            <Typography variant="h6">
                점수: {score} / {totalQuestions}
            </Typography>

            <Typography variant="h6" style={{ marginTop: 20, marginBottom: 10 }}>
                틀린 문제
            </Typography>

            {incorrectQuestions.length === 0 ? (
                <Typography variant="body1">모든 문제를 맞췄습니다!</Typography>
            ) : (
                <List>
                    {incorrectQuestions.map((question, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText
                                    primary={`문제 ${index + 1}: ${question.문제}`}
                                    secondary={`정답: ${question.정답}, 입력한 답: ${question.입력한_답}`}
                                />
                            </ListItem>
                            {index < incorrectQuestions.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '35vw' }}
                    onClick={handleClickOpen}  // 후원하기 버튼 클릭 시 모달 열기
                >
                    후원하기
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '35vw' }}
                    onClick={() => window.open('https://m.expert.naver.com/expert/profile/home?storeId=100052750&u=XpRrZdxWRa3N3VwnVzIQ%252FSMgJyXoC2IrtEGykNoZk7M%253D', '_blank')}
                >
                    상담받기
                </Button>
            </div>

            {/* 모달 (Dialog) 컴포넌트 */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>후원 안내</DialogTitle>
                        <img src = "/qr_toss.png"></img>
                <DialogContent>
                    <Typography>
                        본 콘텐츠가 유익하셨다면 후원하실 수 있습니다. 스마트폰 카메라로 QR코드를 스캔하면 토스로 연결됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>

            <Typography
                variant="body2"
                style={{
                    paddingTop: "100px",
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: '#666',
                    whiteSpace: 'nowrap',  // 텍스트 줄바꿈 방지
                    overflow: 'hidden',  // 내용이 넘칠 경우 숨김
                    textOverflow: 'ellipsis',  // 정확한 가운데 정렬
                }}
            >
                © 2024 사주읽는 치히로 All Rights Reserved.
            </Typography>
        </Paper>
    );
};

export default ResultsComponent;
