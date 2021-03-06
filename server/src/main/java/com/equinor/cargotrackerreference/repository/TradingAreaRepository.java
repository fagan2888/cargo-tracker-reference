package com.equinor.cargotrackerreference.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.equinor.cargotracker.common.domain.TradingArea;

@Repository
public interface TradingAreaRepository extends CrudRepository<TradingArea, String> {

}
