using RentYourHome.Models.Ads;

namespace RentYourHome.Repositories.AdRepository;

public interface IAdRepository
{
    void AddAdToDb(AdReqDto ad);
    Task<IEnumerable<AdDto>> GetAllAds();
    Task<Ad?> GetAdById(int id);
    void UpdateAd(Ad ad);
    void DeleteAd(Ad ad);
}