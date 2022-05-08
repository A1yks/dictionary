import { CircularProgress, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { Word } from '../../types/common';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../../styles/WordListItem.module.scss';
import { useWordsContext } from '../../context/WordsContexts';
import c from 'classnames';

interface Props {
	wordInfo: Word | null;
	loading?: boolean;
	showActions?: boolean;
	showTranslation?: boolean;
	className?: string;
	showTranscription?: boolean;
}

// TODO add transcription

const WordsListItem: FC<Props> = (props) => {
	const { setWordToDelete, openDeleteWordDialog, setWordInfo, openWordFullInfoDialog } = useWordsContext();
	const audio = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (audio.current === null) {
			audio.current = new Audio();
		}

		return () => {
			if (audio.current !== null) {
				audio.current.removeAttribute('src');
				audio.current.load();
				audio.current = null;
			}
		};
	}, []);

	function playWord() {
		if (audio.current !== null && props.wordInfo?.phonetic?.audio) {
			audio.current.src = props.wordInfo.phonetic.audio;
			audio.current.load();
			audio.current.play();
		}
	}

	function openWordFullInfoDialogHandler() {
		if (props.wordInfo !== null) {
			setWordInfo(props.wordInfo);
			openWordFullInfoDialog();
		}
	}

	function openDeleteWordDialogHandler() {
		if (props.wordInfo !== null) {
			setWordToDelete(props.wordInfo.source);
			openDeleteWordDialog();
		}
	}

	if (props.loading) {
		return (
			<Paper variant="outlined">
				<div className={styles.loader}>
					<CircularProgress size="1.5rem" />
				</div>
			</Paper>
		);
	}

	if (props.wordInfo !== null) {
		return (
			<Paper className={c(styles.item, props.className)} variant="outlined">
				<div className={styles.firstTranslations}>
					<Typography component="span" className={styles.sourceWord}>
						{props.wordInfo.source}{' '}
						{props.showTranscription && props.wordInfo.phonetic?.text && (
							<Typography component="span" className={styles.transcription}>
								[{props.wordInfo.phonetic.text}]
							</Typography>
						)}
					</Typography>
					{props.showTranslation && (
						<>
							<Typography component="span">
								{' - '}
								{props.wordInfo.firstTranslations.join(', ')}
							</Typography>
						</>
					)}
				</div>

				<div className={styles.buttons}>
					{props.wordInfo?.phonetic?.audio && (
						<Tooltip title="Прослушать произношение">
							<IconButton onClick={playWord}>
								<VolumeUpIcon />
							</IconButton>
						</Tooltip>
					)}
					{props.showActions && (
						<>
							<Tooltip title="Показать полную информацию о слове">
								<IconButton onClick={openWordFullInfoDialogHandler}>
									<InfoIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Удалить слово">
								<IconButton onClick={openDeleteWordDialogHandler}>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</>
					)}
				</div>
			</Paper>
		);
	}

	return null;
};

export default WordsListItem;
