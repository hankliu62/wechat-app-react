import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Selector from '../Selector/Selector';
import { RestUtilInstance } from '../../utils/RestUtil';
import * as API from '../../constants/Api';

class Location extends Component {
    static propTypes = {
      province: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string
      }),
      city: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string
      }),
      district: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string
      }),
      validating: PropTypes.bool, // 是否验证location值得有效性
      // static: PropTypes.bool,
      // required: PropTypes.bool,
      onFetchProvinces: PropTypes.func,
      onFetchCities: PropTypes.func,
      onFetchDistricts: PropTypes.func,
      onChangeLocation: PropTypes.func,
      onError: PropTypes.func,
      onSetState: PropTypes.func
    }

    static defaultProps = {
      province: {},
      city: {},
      district: {},
      static: false,
      hasCode: false,
      onChangeLocation: () => {},
      onError: obj => alert(obj.message),
      onSetState: () => {}
    }

    constructor(props) {
      super(props);

      this.state = {
        provinces: [],
        cities: [],
        districts: []
      };

      this.initComponent(props);

      this.cacheData = {
        provinces: {},
        cities: {},
        districts: {}
      };
    }

    componentWillReceiveProps(nextProps) {
      const { province: nextProvince, city: nextCity } = nextProps;
      const { province, city } = this.props;

      if (nextProvince && (!province || nextProvince.id !== province.id)) {
        const citiesCacheData = this.cacheData.cities;
        const nextProvinceId = nextProvince.id;

        if (citiesCacheData[nextProvinceId]) {
          const nextState = { cities: citiesCacheData[nextProvinceId].items };
          this.setState(nextState, () => this.props.onSetState(nextState));
        } else {
          this.handleFetchCities(nextProvinceId);
        }
      }

      if (nextCity && (!city || nextCity.id !== city.id)) {
        const districtsCacheData = this.cacheData.districts;
        const nextProvinceId = nextProvince.id;
        const nextCityId = nextCity.id;

        if (districtsCacheData[`${nextProvinceId}_${nextCityId}`]) {
          const nextState = { districts: districtsCacheData[`${nextProvinceId}_${nextCityId}`].items };
          this.setState(nextState, () => this.props.onSetState(nextState));
        } else {
          this.handleFetchDistricts(nextProvinceId, nextCityId);
        }
      }
    }

    fetchProvinces = () => {
      return new Promise((resolve, reject) => {
        RestUtilInstance.Get(API.API_FETCH_DISTRICTS).then((data) => {
          resolve(data.data || []);
        }, () => {
          this.props.onError({
            status: 'error',
            message: '获取省份失败'
          });
          reject();
        }, this);
      });
    }

    fetchCities = (provinceId) => {
      return new Promise((resolve, reject) => {
        RestUtilInstance.Get(API.API_FETCH_CITIES, { provinceId }).then((data) => {
          const cities = [];
          for (const city of (data.data.dataList || [])) {
            cities.push({ id: city.cityId, name: city.cityName, shouzimu: city.shouzimu });
          }
          resolve(cities);
        }, () => {
          this.props.onError({
            status: 'error',
            message: '获取城市失败'
          });
          reject();
        }, this);
      });
    }

    fetchDistricts = (provinceId, cityId) => {
      return new Promise((resolve, reject) => {
        RestUtilInstance.Get(API.API_FETCH_DISTRICTS, { provinceId, cityId }).then((data) => {
          resolve(data.data.dataList || []);
        }, () => {
          this.props.onError({
            status: 'error',
            message: '获取市县失败'
          });
          reject();
        }, this);
      });
    }

    handleSelectProvince = (provinceId) => {
      if (!this.props.province || provinceId !== this.props.province.id) {
        const provincesCacheData = this.cacheData.provinces;
        const citiesCacheData = this.cacheData.cities;

        if (citiesCacheData[provinceId]) {
          const nextState = { cities: citiesCacheData[provinceId].items };
          this.setState(nextState, () => this.props.onSetState(nextState));
        }

        const province = { id: provinceId, name: (provincesCacheData[provinceId] || {}).name };
        this.props.onChangeLocation({ province, city: null, district: null });
        this.setState({ districts: [] }, () => this.props.onSetState({ districts: [] }));
      }
    }

    handleSelectCity = (cityId) => {
      if (!this.props.city || cityId !== this.props.city.id) {
        const citiesCacheData = this.cacheData.cities;
        const districtsCacheData = this.cacheData.districts;
        const { province: { id: provinceId } } = this.props;

        if (districtsCacheData[`${provinceId}_${cityId}`]) {
          const nextState = { districts: districtsCacheData[`${provinceId}_${cityId}`].items };
          this.setState(nextState, () => this.props.onSetState(nextState));
        }

        const city = { id: cityId, name: (citiesCacheData[provinceId][cityId] || {}).name };
        this.props.onChangeLocation({ city, district: null });
      }
    }

    handleSelectDistrict = (districtId) => {
      const { province: { id: provinceId }, city: { id: cityId } } = this.props;
      const districtsCacheData = this.cacheData.districts;
      const district = { id: districtId, name: (districtsCacheData[`${provinceId}_${cityId}`][districtId] || {}).name };
      this.props.onChangeLocation({ district });
    }

    handleFetchProvinces = () => {
      const fetchProvinces = this.props.onFetchProvinces || this.fetchProvinces;
      fetchProvinces().then((provinces) => {
        this.updatedProvincesToCache(provinces);
        const nextState = { provinces: this.cacheData.provinces.items };
        this.setState(nextState, () => this.props.onSetState(nextState));
      });
    }

    handleFetchCities = (provinceId) => {
      const fetchCities = this.props.onFetchCities || this.fetchCities;
      fetchCities(provinceId).then((cities) => {
        this.updatedCitiesToCache(provinceId, cities);
        const nextState = { cities: this.cacheData.cities[provinceId].items };
        this.setState(nextState, () => this.props.onSetState(nextState));
      });
    }

    handleFetchDistricts = (provinceId, cityId) => {
      const fetchDistricts = this.props.onFetchDistricts || this.fetchDistricts;
      fetchDistricts(provinceId, cityId).then((districts) => {
        this.updatedDistrictsToCache(provinceId, cityId, districts);
        const nextState = { districts: this.cacheData.districts[`${provinceId}_${cityId}`].items };
        this.setState(nextState, () => this.props.onSetState(nextState));
      });
    }

    initComponent = (props) => {
      const { province, city } = props;
      this.handleFetchProvinces();

      if (province.id) {
        this.handleFetchCities(province.id);

        if (city.id) {
          this.handleFetchDistricts(province.id, city.id);
        }
      }
    }

    validateProvince = () => {
      const { province } = this.props;

      return province && province.id;
    }

    validateCity = () => {
      const { city } = this.props;

      return (city && city.id) || (this.validateProvince() && (!this.state.cities || !this.state.cities.length) && (!city || !city.id));
    }

    validateDistrict = () => {
      const { district } = this.props;

      return (district && district.id) || (this.validateCity() && (!this.state.districts || !this.state.districts.length) && (!district || !district.id));
    }

    updatedProvincesToCache = (provinces) => {
      this.cacheData.provinces = {};
      const provincesCacheData = this.cacheData.provinces;
      for (const province of (provinces || [])) {
        provincesCacheData[province.id] = {
          name: province.name,
          cities: {}
        };
      }
      provincesCacheData.items = provinces;
    }

    updatedCitiesToCache = (provinceId, cities) => {
      const citiesCacheData = {};
      const items = [];

      for (const city of (cities || [])) {
        citiesCacheData[city.id] = {
          name: city.name,
          shouzimu: city.shouzimu,
          districts: {}
        };
        items.push({ ...city });
      }
      citiesCacheData.items = items;
      this.cacheData.cities[provinceId] = citiesCacheData;
    }

    updatedDistrictsToCache = (provinceId, cityId, districts) => {
      const districtsCacheData = {};
      const items = [];

      for (const district of (districts || [])) {
        districtsCacheData[district.id] = {
          name: district.name
        };
        items.push({ ...district });
      }
      districtsCacheData.items = items;
      this.cacheData.districts[`${provinceId}_${cityId}`] = districtsCacheData;
    }

    render() {
      const province = this.props.province || {};
      const city = this.props.city || {};
      const district = this.props.district || {};
      const { provinces, cities, districts } = this.state;
      const { validating } = this.props;

      const isProvinceValid = this.validateProvince();
      const isCityValid = this.validateCity();
      const isDistrictValid = this.validateDistrict();

      return (
        <div className="hk-location">
          <div className="hk-location-column hk-location-provinces">
            <Selector
              className={classNames('hk-form-control', { error: !!validating && !isProvinceValid })}
              value={province.id}
              options={provinces}
              valueField="id"
              labelField="name"
              placeholder="请选择省份"
              onChange={this.handleSelectProvince}
            />
          </div>
          <div className="hk-location-column hk-location-cities">
            <Selector
              className={classNames('hk-form-control', { error: !!validating && !isCityValid })}
              value={city.id}
              options={cities}
              valueField="id"
              labelField="name"
              placeholder="请选择城市"
              onChange={this.handleSelectCity}
            />
          </div>
          <div className="hk-location-column hk-location-districts">
            <Selector
              className={classNames('hk-form-control', { error: !!validating && !isDistrictValid })}
              value={district.id}
              options={districts}
              valueField="id"
              labelField="name"
              placeholder="请选择区县"
              onChange={this.handleSelectDistrict}
            />
          </div>
        </div>
      );
    }
}

export default Location;
