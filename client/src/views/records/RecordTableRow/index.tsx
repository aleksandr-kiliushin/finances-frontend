import React, { useState } from 'react'

// Models
import { useAppDispatch } from '#utils/hooks'
import { deleteRecordTc, restoreRecordTc } from '#models/finance/action-creators'

// Components
import { Svg } from '#components/Svg'
import { TableRow } from '#components/Table/TableRow'
import { TableCell } from '#components/Table/TableCell'
import { RecordModal } from '#views/records/RecordModal'

// Styles
import s from './index.module.css'

// Types
import { IFinanceCategory, IFinanceRecord } from '#interfaces/finance'

export const RecordTableRow = ({ categories, isTrash, record }: IProps) => {
	const dispatch = useAppDispatch()

	const [isRecordEditingModalShown, setIsRecordEditingModalShown] = useState(false)

	const { amount, date, category } = record

	const editOrRestoreTableCell = isTrash ? (
		<TableCell onClick={() => dispatch(restoreRecordTc(record.id))}>
			<Svg name="reply" />
		</TableCell>
	) : (
		<TableCell onClick={() => setIsRecordEditingModalShown(true)}>
			<Svg name="pencil" />
		</TableCell>
	)

	return (
		<>
			<TableRow cnTableRow={s.TableRow}>
				<TableCell>{amount}</TableCell>
				<TableCell>{category.name}</TableCell>
				<TableCell>{date.slice(2)}</TableCell>
				{editOrRestoreTableCell}
				<TableCell
					onClick={() =>
						dispatch(deleteRecordTc({ isTrashed: record.isTrashed, recordId: record.id }))
					}
				>
					<Svg name="trash-can" />
				</TableCell>
			</TableRow>

			{isRecordEditingModalShown && (
				<RecordModal
					categories={categories}
					closeModal={() => setIsRecordEditingModalShown(false)}
					record={record}
				/>
			)}
		</>
	)
}

interface IProps {
	categories: IFinanceCategory[]
	isTrash: boolean
	record: IFinanceRecord
}