import React from 'react'
import { IndividualData } from './IndividualData'

export const Data = ({ excelData, employeeName, checkData, setCheckData, paginationData, handleChange }) => {
    return paginationData.map((individualExcelData) => (
        <tr key={individualExcelData.Id}>
            <IndividualData
                individualExcelData={individualExcelData}
                employeeName={employeeName}
                checkData={checkData}
                setCheckData={setCheckData}
                handleChange={handleChange}
            />
        </tr>
    ))
}
