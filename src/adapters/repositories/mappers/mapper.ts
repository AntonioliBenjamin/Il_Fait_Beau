export interface Mapper<DomainModel, OutsideModel> {
    toDomain?(raw: OutsideModel): DomainModel;

    fromDomain?(date: DomainModel): OutsideModel;
}