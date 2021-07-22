import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/headers/home';
import SubHeader from '../components/headers/sub';
import InputModal from '../components/modals/input';
import PromptModal from '../components/modals/prompt';
import LItem from '../components/listitem';

import { HomeScreenStyles, ScreenStyles } from './styles';

import { defaultCategories, defaultSettings } from '../data/default';
import { DisplaySectionType, ScreenProps } from '../types/ui';
import { ReduxPropType } from '../types/redux';
import { Categories, CategoryStore, DataMap, DataType, SettingsType } from '../types/data';
import { ScrollView } from 'react-native-gesture-handler';
import { keygen } from '../utils/keygen';
import { store } from '../redux/store';
import { deleteRecord, editRecord, setPromptShow } from '../redux/action';
import { Prompt } from '../data/prompts';

const alternative: DataType = {
	categoryKey: 'C0000000',
	categoryType: Categories.EXPENSE,
	date: moment().format('DD-MM-YYYY'),
	key: keygen(),
	title: '',
	value: 0,
}

class Screen extends React.Component<ReduxPropType & ScreenProps> {
	state = {
		deleteMode: false,
		edit: undefined,
		filterCategory: undefined,
		filterDate: '',
		imOpen: false,
		pmOpen: null,
		render: false,
	}

	confirmDelete = (record: DataType | null, show: boolean) => {
		if (record !== null)
			store.dispatch(deleteRecord(record));
		store.dispatch(setPromptShow({ prompt: Prompt.DELETE_RECORD, show }));
		this.setState({ pmOpen: null });
	}

	deleteRecord = (record: DataType) => {
		if (this.props.settings?.promptTrigger[Prompt.DELETE_RECORD])
			this.setState({ pmOpen: record });
		else
			this.confirmDelete(record, false);
	}

	onEdit = (obj: DataType) => {
		store.dispatch(editRecord({ new: obj, old: this.state.edit || alternative }));
		this.setState({ edit: alternative, imOpen: false });
	}

	render() {
		console.log(this.props.data);

		let categories: CategoryStore = this.props.categories || defaultCategories;
		let data: DataMap = this.props.data?.data || {};
		let settings: SettingsType = this.props.settings || defaultSettings;

		let sections: Array<DisplaySectionType> = this.props.display || [];
		if (this.state.filterDate)
			sections = sections.filter((section: DisplaySectionType) => section.date === this.state.filterDate);

		return (
			<>
				<View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
					<Header
						navigation={this.props.navigation}
						onFilterDate={(filterDate: string) => this.setState({ filterDate })}
						onPressSync={() => { }}
						toggleDeleting={(deleteMode: boolean) => this.setState({ deleteMode })}
					/>
					<ScrollView>
						<View style={ScreenStyles.scrollView}>
							{sections.map((section: DisplaySectionType) => {
								return (
									<View key={section.date} style={ScreenStyles.scrollView}>
										<SubHeader label={section.date} />
										{section.keys.map((key: string) => {
											let record: DataType = data[key];

											return (
												<LItem
													fallbackCatName
													category={categories[record.categoryType][record.categoryKey]}
													key={record.key}
													onPress={() => this.setState({ edit: record, imOpen: true })}
													label={record.title}
												>
													{this.state.deleteMode ?
														<TouchableOpacity onPress={() => this.deleteRecord(record)}>
															<Icon
																color={this.props.theme.dynamic.text.mainC}
																name='trash-can-outline'
																size={25}
															/>
														</TouchableOpacity> :
														<View style={HomeScreenStyles.valueBox}>
															<Icon
																color={this.props.theme.dynamic.text.mainC}
																name={settings.currency.icon}
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
					onClose={() => this.setState({ edit: alternative, imOpen: false })}
					onConfirm={this.onEdit}
					open={this.state.imOpen}
				/>
				<PromptModal
					onClose={() => this.setState({ pmOpen: null })}
					onConfirm={(dnsa: boolean) => this.confirmDelete(this.state.pmOpen, !dnsa)}
					open={this.state.pmOpen !== null}
					prompt={Prompt.DELETE_RECORD}
				/>
			</>
		);
	}
}

const mapStateToProps = (state: ReduxPropType) => ({
	categories: state.categories,
	data: state.data,
	display: state.display,
	settings: state.settings,
	theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
