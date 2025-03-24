import Link from 'next/link';
import React from 'react';

const ExamDatesOverview: React.FC = () => {
  return (
    <div style={{ marginTop: '2rem' }}>
        <h1>Exam Dates Übersicht</h1>     
        <Link href="/exam_dates/download">Klausurtermine herunterladen</Link>
    </div>
  );
};

export default ExamDatesOverview;
