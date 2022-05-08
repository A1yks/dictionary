import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Word, Definition, PartsOfSpeech } from '../../types/common';
import { TranslatedPartfsOfSpeech, translatedPartsOfSpeech } from '../../types/words';
import styles from '../../styles/WordDefinitions.module.scss';

interface Props {
	wordInfo: Word;
}

const WordDefinitions: FC<Props> = (props) => {
	const { wordInfo } = props;

	return (
		<Grid container direction="column" className={styles.container}>
			<Grid item>
				<Typography component="p">
					<Typography component="span" className={styles.sourceWord}>
						{wordInfo.source}
					</Typography>{' '}
					- определения:
				</Typography>
			</Grid>
			<Grid container item direction="column" className={styles.definitionsWrapper}>
				{Object.keys(wordInfo.definitions).map((key) => {
					const wordDefinitions: Definition[] = wordInfo.definitions[key as keyof PartsOfSpeech<Definition>];

					if (wordDefinitions.length === 0) return null;

					const translatedPartOfSpeech = translatedPartsOfSpeech[key as keyof TranslatedPartfsOfSpeech];

					return (
						<Grid item key={key} className={styles.definitionsContainer}>
							<Typography component="p" className={styles.partOfSpeech} color="blue">
								{translatedPartOfSpeech}:
							</Typography>
							<Grid container direction="column">
								{wordDefinitions.map((def, i) => {
									return (
										<Grid item key={i} className={styles.definitionContent}>
											<Typography component="p" className={styles.example}>
												Определение:
											</Typography>
											<Typography component="p">{def.definition}</Typography>
											{def.example && (
												<>
													<Typography component="p" className={styles.example}>
														Пример:
													</Typography>
													<Typography component="p">{def.example}</Typography>
												</>
											)}
										</Grid>
									);
								})}
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default WordDefinitions;
