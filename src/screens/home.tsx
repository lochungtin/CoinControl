import moment from 'moment';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/headers/home';
import SubHeader from '../components/headers/sub';
import InputModal from '../components/modals/input';
import PromptModal from '../components/modals/prompt';
import LItem from '../components/listitem';

import { HomeScreenStyles, ScreenStyles } from './styles';

import { Prompt } from '../data/prompts';
import { firebaseDefaultErrorCallback, firebaseDeleteRecord, firebaseFetchAll, firebaseUpdateRecord } from '../firebase/data';
import { AccountType, Categories, CategoryStore, DataStore, DataType, SettingsType } from '../types/data';
import { FirebaseFullSnapshot } from '../types/firebase';
import { ReduxThemeType } from '../types/redux';
import { DisplaySectionType, ScreenProps } from '../types/ui';
import { dataDelete, dataEdit, displayDelete, displayEdit, settingsSetPromptShow } from '../redux/action';
import { store } from '../redux/store';
import { merge } from '../utils/merger';

interface AdditionalReduxProps {
	account: AccountType,
	categories: CategoryStore,
	data: DataStore,
	display: Array<DisplaySectionType>,
	settings: SettingsType,
}

const alternative: DataType = {
	categoryKey: 'C0000000',
	categoryType: Categories.EXPENSE,
	date: moment().format('DD-MM-YYYY'),
	key: '',
	lmt: '',
	title: '',
	value: 0,
}

class HomeScreen extends React.Component<ReduxThemeType & ScreenProps & AdditionalReduxProps> {

	state = {
		deleteMode: false,
		edit: alternative,
		filterCategory: undefined,
		filterDate: '',
		imOpen: false,
		pmOpen: false,
		prompt: Prompt.COMMIT_SYNC,
		record: null,
		render: false,
	}

	confirmDelete = (record: DataType | null) => {
		if (record !== null) {
			store.dispatch(dataDelete(record));
			store.dispatch(displayDelete(record));

			if (this.props.account)
				firebaseDeleteRecord(this.props.account.uid, record.key);
		}

		this.setState({ pmOpen: false });
	}

	confirmSync = () => {
		if (this.props.account)
			firebaseFetchAll(this.props.account.uid)
				.then((snapshot: FirebaseFullSnapshot) => merge(
					this.props.account.uid,
					this.props.data.data,
					this.props.categories,
					snapshot
				))
				.catch(firebaseDefaultErrorCallback);

		this.setState({ pmOpen: false });
	}

	dataDelete = (record: DataType) => {
		if (this.props.settings.promptTrigger[Prompt.DELETE_RECORD])
			this.setState({ pmOpen: true, prompt: Prompt.DELETE_RECORD, record });
		else
			this.confirmDelete(record);
	}

	onEdit = (obj: DataType) => {
		if (this.state.edit !== null) {
			store.dispatch(dataEdit({ new: obj, old: this.state.edit }));
			store.dispatch(displayEdit({ new: obj, old: this.state.edit }));

			if (this.props.account)
				firebaseUpdateRecord(this.props.account.uid, obj);
		}

		this.setState({ edit: null, imOpen: false });
	}

	onConfirm = (show: boolean) => {
		store.dispatch(settingsSetPromptShow({ prompt: this.state.prompt, show }));

		switch (this.state.prompt) {
			case Prompt.DELETE_RECORD:
				return this.confirmDelete(this.state.record);
			case Prompt.COMMIT_SYNC:
				return this.confirmSync();
			default:
				return;
		}
	}

	sync = () => {
		if (this.props.account) {
			if (this.props.settings.promptTrigger[Prompt.COMMIT_SYNC])
				this.setState({ pmOpen: true, prompt: Prompt.COMMIT_SYNC });
			else
				this.confirmSync();
		}
	}

	render() {
		let sections: Array<DisplaySectionType> = this.props.display;
		if (this.state.filterDate)
			sections = sections.filter((section: DisplaySectionType) => section.date === this.state.filterDate);

		return (
			<>
				<View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
					<Header
						navigation={this.props.navigation}
						onFilterDate={(filterDate: string) => this.setState({ filterDate })}
						onPressSync={this.sync}
						toggleDeleting={(deleteMode: boolean) => this.setState({ deleteMode })}
					/>
					<ScrollView>
						<View style={ScreenStyles.scrollView}>
							{sections.map((section: DisplaySectionType) => {
								return (
									<View key={section.date} style={ScreenStyles.scrollView}>
										<SubHeader label={section.date} />
										{section.keys.map((key: string) => {
											let record: DataType = this.props.data.data[key];

											if (!record)
												return <View />

											return (
												<LItem
													fallbackCatName
													category={this.props.categories[record.categoryType][record.categoryKey]}
													key={record.key}
													onPress={() => this.setState({ edit: record, imOpen: true })}
													label={record.title}
												>
													{this.state.deleteMode ?
														<TouchableOpacity onPress={() => this.dataDelete(record)}>
															<Icon
																color={this.props.theme.dynamic.text.mainC}
																name='trash-can-outline'
																size={25}
															/>
														</TouchableOpacity> :
														<View style={HomeScreenStyles.valueBox}>
															<Icon
																color={this.props.theme.dynamic.text.mainC}
																name={this.props.settings.currency.icon}
																size={20}
															/>
															<Text style={{ ...HomeScreenStyles.value, color: this.props.theme.dynamic.text.mainC }}>
																{record.value}
															</Text>
														</View>
													}
												</LItem>
											);
										})}
									</View>
								);
							})}
						</View>
					</ScrollView>
				</View>
				<InputModal
					record={this.state.edit || alternative}
					onClose={() => this.setState({ edit: null, imOpen: false })}
					onConfirm={this.onEdit}
					open={this.state.imOpen}
				/>
				<PromptModal
					onClose={() => this.setState({ pmOpen: false })}
					onConfirm={(dnsa: boolean) => this.onConfirm(!dnsa)}
					open={this.state.pmOpen}
					prompt={this.state.prompt}
				/>
			</>
		);
	}
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxProps) => ({
	account: state.account,
	categories: state.categories,
	data: state.data,
	display: state.display,
	settings: state.settings,
	theme: state.theme,
});

export default connect(mapStateToProps)(HomeScreen);
