import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { PartsOfSpeech, Word } from '../../types/common';
import styles from '../../styles/WordTranslations.module.scss';
import { TranslatedPartfsOfSpeech, translatedPartsOfSpeech } from '../../types/words';

interface Props {
	wordInfo: Word;
}

const WordTranslations: FC<Props> = (props) => {
	const { wordInfo } = props;

	return (
		<Grid container direction="column" className={styles.container}>
			<Grid item>
				<Typography component="p">
					<Typography component="span" className={styles.sourceWord}>
						{wordInfo.source}
					</Typography>{' '}
					- {wordInfo.firstTranslations.length > 1 ? 'переводы' : 'перевод'}:
				</Typography>
			</Grid>
			<Grid item container direction="column" className={styles.translationsWrapper}>
				{Object.keys(wordInfo.translations).map((key) => {
					const wordTranslations = wordInfo.translations[key as keyof PartsOfSpeech];

					if (wordTranslations.length === 0) return null;

					const translatedPartOfSpeech = translatedPartsOfSpeech[key as keyof TranslatedPartfsOfSpeech];

					return (
						<Grid item key={key}>
							<Typography component="p" className={styles.partOfSpeech} color="blue">
								{translatedPartOfSpeech}:
							</Typography>
							<Typography component="p" className={styles.wordTranslations}>
								{wordTranslations.join(', ')}
							</Typography>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default WordTranslations;
