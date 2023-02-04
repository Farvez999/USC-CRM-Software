import React from 'react'
import { IndividualData } from './IndividualData'

export const Data = ({ excelData, employeeName, checkData, setCheckData }) => {
    return excelData.map((individualExcelData) => (
        <tr key={individualExcelData.Id}>
            <IndividualData
                individualExcelData={individualExcelData}
                employeeName={employeeName}
                checkData={checkData}
                setCheckData={setCheckData}
            />
        </tr>
    ))
}
