
//import React from 'react';
import { generateExamImage } from './imageGenerator';

const ExamImage = ({ type, customData }) => {
    return generateExamImage(type, customData);
};

export default ExamImage;