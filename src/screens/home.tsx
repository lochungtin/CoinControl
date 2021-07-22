import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/headers/home';
import SubHeader from '../components/headers/sub';
import InputModal from '../components/modals/input';
import LItem from '../components/listitem';

import { HomeScreenStyles, ScreenStyles } from './styles';

import { defaultCategories, defaultData, defaultSettings } from '../data/default';
import { DisplaySectionType, ScreenProps } from '../types/ui';
import { ReduxPropType } from '../types/redux';
import { Categories, CategoryStore, CategoryType, DataMap, DataType, SettingsType } from '../types/data';
import { ScrollView } from 'react-native-gesture-handler';
import { keygen } from '../utils/keygen';
import moment from 'moment';

class Screen extends React.Component<ReduxPropType & ScreenProps> {
	state = {
		edit: undefined,
		filterCategory: undefined,
		filterDate: '',
		open: false,
		render: false,
	};

	render() {
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
						onFilterCategory={(filterCategory: CategoryType | undefined) => this.setState({ filterCategory })}
						onFilterDate={(filterDate: string) => this.setState({ filterDate })}
						onPressSync={() => { }}
					/>
					<ScrollView>
						<View style={ScreenStyles.scrollView}>
							{sections.map((section: DisplaySectionType) => {
								return (
									<>
										<SubHeader key={section.date} label={section.date} />
										{section.keys.map((key: string) => {
											let record: DataType = data[key];

											return (
												<LItem
													fallbackCatName
													category={categories[record.categoryType][record.categoryKey]}
													key={record.key}
													onPress={() => this.setState({ edit: record, open: true})}
													label={record.title}
												>
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
												</LItem>
											);
										})}
									</>
								);
							})}
						</View>
					</ScrollView>
				</View>
				<InputModal
					record={this.state.edit || {
						categoryKey: 'C0000000',
						categoryType: Categories.EXPENSE,
						date: moment().format('DD-MM-YYYY'),
						key: keygen(),
						title: '',
						value: 0,
					}}
					onClose={() => this.setState({ open: false })}
					onConfirm={(obj: DataType) => console.log(obj)}
					open={this.state.open}
				/>
			</>
		);
	}
}

const mapStateToProps = (state: ReduxPropType) => ({
	categories: state.categories,
	data: state.data,
	display: state.display,
	theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
