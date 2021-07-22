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

import { defaultData } from '../data/default';
import { DisplaySectionType, ScreenProps } from '../types/ui';
import { ReduxThemeType } from '../types/redux';
import { Categories, CategoryStore, DataMap, DataStore, DataType, SettingsType } from '../types/data';
import { ScrollView } from 'react-native-gesture-handler';
import { keygen } from '../utils/keygen';
import { store } from '../redux/store';
import { dataDelete, dataEdit, displayDelete, displayEdit, settingsSetPromptShow } from '../redux/action';
import { Prompt } from '../data/prompts';

interface AdditionalReduxType {
    categories: CategoryStore,
	data: DataStore,
	display: Array<DisplaySectionType>,
    settings: SettingsType,
}

const alternative: DataType = {
	categoryKey: 'C0000000',
	categoryType: Categories.EXPENSE,
	date: moment().format('DD-MM-YYYY'),
	key: keygen(),
	title: '',
	value: 0,
}

class Screen extends React.Component<ReduxThemeType & ScreenProps & AdditionalReduxType> {
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
		if (record !== null) {
			store.dispatch(dataDelete(record));
			store.dispatch(displayDelete(record));
		}
		store.dispatch(settingsSetPromptShow({ prompt: Prompt.DELETE_RECORD, show }));
		this.setState({ pmOpen: null });
	}

	dataDelete = (record: DataType) => {
		if (this.props.settings?.promptTrigger[Prompt.DELETE_RECORD])
			this.setState({ pmOpen: record });
		else
			this.confirmDelete(record, false);
	}

	onEdit = (obj: DataType) => {
		store.dispatch(dataEdit({ new: obj, old: this.state.edit || alternative }));
		store.dispatch(displayEdit({ new: obj, old: this.state.edit || alternative }));
		this.setState({ edit: alternative, imOpen: false });
	}

	render() {
		console.log(defaultData);

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
											let record: DataType = this.props.data.data[key];

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

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
	categories: state.categories,
	data: state.data,
	display: state.display,
	settings: state.settings,
	theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
